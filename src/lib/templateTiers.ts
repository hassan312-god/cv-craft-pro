export type TemplateTier = "free" | "premium";

/** Modèles accessibles gratuitement (tous les autres sont premium). */
export const freeTemplateIds = new Set<string>([
  "template-01-modern",
  "template-02-professional",
  "template-03-minimal",
  "template-06-academic",
  "template-07-compact",
  "classic-01",
  "minimal-01",
  "minimal-02",
  "pro-02",
  "modern-01",
  "creative-01",
  "photo-01",
]);

export const getTemplateTier = (templateId: string): TemplateTier =>
  freeTemplateIds.has(templateId) ? "free" : "premium";

export const isPremiumTemplate = (templateId: string): boolean =>
  getTemplateTier(templateId) === "premium";

export const templateTierLabels: Record<TemplateTier, string> = {
  free: "Gratuit",
  premium: "Premium",
};
