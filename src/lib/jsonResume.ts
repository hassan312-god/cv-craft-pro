import type { CVData } from "@/pages/CVCreate";

/**
 * Conversion CVData -> JSON Resume (https://jsonresume.org/schema/)
 * Utilisé pour alimenter les thèmes npm officiels JSON Resume.
 */

export interface JsonResume {
  basics: {
    name: string;
    label?: string;
    image?: string;
    email?: string;
    phone?: string;
    url?: string;
    summary?: string;
    location?: { address?: string; city?: string; countryCode?: string };
    profiles?: { network: string; username: string; url: string }[];
  };
  work?: {
    name?: string;
    position?: string;
    url?: string;
    startDate?: string;
    endDate?: string;
    summary?: string;
    highlights?: string[];
  }[];
  education?: {
    institution?: string;
    area?: string;
    studyType?: string;
    startDate?: string;
    endDate?: string;
    score?: string;
    courses?: string[];
  }[];
  skills?: { name: string; level?: string; keywords?: string[] }[];
  languages?: { language: string; fluency?: string }[];
  projects?: unknown[];
}

const SKILL_LEVELS = ["Débutant", "Débutant", "Intermédiaire", "Avancé", "Expert", "Maître"];

const normalizeDate = (value?: string): string | undefined => {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  if (/^\d{4}-\d{2}$/.test(trimmed)) return `${trimmed}-01`;
  if (/^\d{4}$/.test(trimmed)) return `${trimmed}-01-01`;
  return trimmed;
};

const usernameFromUrl = (url: string): string => {
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    return parsed.pathname.replace(/^\/+|\/+$/g, "") || parsed.hostname;
  } catch {
    return url;
  }
};

const withProtocol = (url: string): string =>
  url.startsWith("http") ? url : `https://${url}`;

export const toJsonResume = (cvData: CVData): JsonResume => {
  const profiles: JsonResume["basics"]["profiles"] = [];
  if (cvData.linkedin) {
    profiles.push({ network: "LinkedIn", username: usernameFromUrl(cvData.linkedin), url: withProtocol(cvData.linkedin) });
  }
  if (cvData.github) {
    profiles.push({ network: "GitHub", username: usernameFromUrl(cvData.github), url: withProtocol(cvData.github) });
  }
  if (cvData.twitter) {
    profiles.push({ network: "Twitter", username: usernameFromUrl(cvData.twitter), url: withProtocol(cvData.twitter) });
  }

  const firstPosition = cvData.experiences?.[0]?.position ?? "";

  return {
    basics: {
      name: `${cvData.firstName ?? ""} ${cvData.lastName ?? ""}`.trim() || "Votre Nom",
      label: firstPosition,
      image: cvData.photo || undefined,
      email: cvData.email || undefined,
      phone: cvData.phone || undefined,
      url: cvData.portfolio ? withProtocol(cvData.portfolio) : undefined,
      summary: cvData.about || undefined,
      location: cvData.address ? { address: cvData.address, city: cvData.address } : undefined,
      profiles,
    },
    work: (cvData.experiences ?? []).map((exp) => ({
      name: exp.company,
      position: exp.position,
      startDate: normalizeDate(exp.startDate),
      endDate: normalizeDate(exp.endDate),
      summary: exp.description,
      highlights: exp.description
        ? exp.description
            .split(/\n+/)
            .map((line) => line.replace(/^[-•*]\s*/, "").trim())
            .filter(Boolean)
        : [],
    })),
    education: (cvData.education ?? []).map((edu) => ({
      institution: edu.school,
      area: edu.degree,
      studyType: edu.degree,
      startDate: normalizeDate(edu.startDate),
      endDate: normalizeDate(edu.endDate),
      courses: edu.description ? [edu.description] : [],
    })),
    skills: (cvData.skills ?? []).map((skill) => ({
      name: skill.name,
      level: SKILL_LEVELS[Math.max(0, Math.min(5, skill.level ?? 3))],
    })),
  };
};
