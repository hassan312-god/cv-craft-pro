import { supabase } from "@/integrations/supabase/client";

export const OPENROUTER_MODELS = [
  { value: "qwen/qwen-2.5-72b-instruct", label: "Qwen 2.5 72B" },
  { value: "deepseek/deepseek-chat-v3-0324", label: "DeepSeek Chat V3" },
  { value: "meta-llama/llama-3.1-8b-instruct", label: "Llama 3.1 8B" },
  { value: "google/gemini-2.0-flash-001", label: "Gemini 2.0 Flash" },
  { value: "openai/gpt-4o-mini", label: "GPT-4o Mini" },
] as const;

export type OpenRouterModel = (typeof OPENROUTER_MODELS)[number]["value"];

/**
 * Toute la génération IA passe par la fonction serveur `ai-cv`
 * (la clé API reste côté serveur, jamais dans le navigateur).
 */
const invokeAI = async <T,>(action: string, payload: Record<string, unknown>): Promise<T> => {
  const { data, error } = await supabase.functions.invoke("ai-cv", {
    body: { action, payload },
  });

  if (error) {
    console.error(`Erreur IA (${action}):`, error);
    throw new Error("La génération IA a échoué");
  }
  if ((data as { error?: string })?.error) {
    throw new Error((data as { error: string }).error);
  }
  return data as T;
};

export const generateAbout = async (
  cvData: {
    firstName: string;
    lastName: string;
    experiences: Array<{ position: string; company: string; description: string }>;
    education: Array<{ degree: string; school: string }>;
    skills: Array<{ name: string; level: number }>;
  },
  model?: OpenRouterModel
): Promise<string> => {
  const { text } = await invokeAI<{ text: string }>("about", { ...cvData, model });
  return text;
};

export const generateExperienceDescription = async (
  position: string,
  company: string,
  existingDescription?: string,
  model?: OpenRouterModel
): Promise<string> => {
  const { text } = await invokeAI<{ text: string }>("experience", {
    position,
    company,
    existingDescription,
    model,
  });
  return text;
};

export const generateEducationDescription = async (
  degree: string,
  school: string,
  model?: OpenRouterModel
): Promise<string> => {
  const { text } = await invokeAI<{ text: string }>("education", { degree, school, model });
  const words = text.split(/\s+/).filter(Boolean);
  return words.slice(0, 5).join(" ");
};

export type AIStep = "personal" | "experiences" | "education" | "skills" | "socials";

/** Génère un exemple complet pour une étape du formulaire. */
export const generateStepContent = async (
  step: AIStep,
  context: { firstName?: string; lastName?: string; jobTitle?: string },
  model?: OpenRouterModel
): Promise<Record<string, unknown>> => {
  return await invokeAI<Record<string, unknown>>("step", { step, ...context, model });
};
