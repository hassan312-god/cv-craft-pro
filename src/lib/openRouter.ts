import { supabase } from "@/integrations/supabase/client";

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

export const generateAbout = async (cvData: {
  firstName: string;
  lastName: string;
  experiences: Array<{ position: string; company: string; description: string }>;
  education: Array<{ degree: string; school: string }>;
  skills: Array<{ name: string; level: number }>;
}): Promise<string> => {
  const { text } = await invokeAI<{ text: string }>("about", cvData);
  return text;
};

export const generateExperienceDescription = async (
  position: string,
  company: string,
  existingDescription?: string
): Promise<string> => {
  const { text } = await invokeAI<{ text: string }>("experience", {
    position,
    company,
    existingDescription,
  });
  return text;
};

export const generateEducationDescription = async (
  degree: string,
  school: string
): Promise<string> => {
  const { text } = await invokeAI<{ text: string }>("education", { degree, school });
  const words = text.split(/\s+/).filter(Boolean);
  return words.slice(0, 5).join(" ");
};

export type AIStep = "personal" | "experiences" | "education" | "skills" | "socials";

/** Génère un exemple complet pour une étape du formulaire. */
export const generateStepContent = async (
  step: AIStep,
  context: { firstName?: string; lastName?: string; jobTitle?: string }
): Promise<Record<string, unknown>> => {
  return await invokeAI<Record<string, unknown>>("step", { step, ...context });
};
