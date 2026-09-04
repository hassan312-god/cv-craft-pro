import type { CVData, Education, Experience, Skill } from "@/pages/CVCreate";

type JsonResume = {
  basics?: {
    name?: string;
    email?: string;
    phone?: string;
    location?: { address?: string; city?: string; region?: string; postalCode?: string; countryCode?: string };
    profiles?: Array<{ network?: string; username?: string; url?: string }>;
    summary?: string;
  };
  work?: Array<{ name?: string; position?: string; startDate?: string; endDate?: string; summary?: string; highlights?: string[] }>;
  education?: Array<{ institution?: string; studyType?: string; area?: string; startDate?: string; endDate?: string; summary?: string; courses?: string[] }>;
  skills?: Array<{ name?: string; level?: string; keywords?: string[] }>;
  [key: string]: unknown;
};

const text = (value: unknown) => typeof value === "string" ? value.trim() : "";

const splitName = (name: string) => {
  const parts = name.split(/\s+/).filter(Boolean);
  return { firstName: parts.shift() ?? "", lastName: parts.join(" ") };
};

const profileUrl = (resume: JsonResume, network: string) => {
  const profile = resume.basics?.profiles?.find((item) => text(item.network).toLowerCase() === network);
  return text(profile?.url) || text(profile?.username);
};

const locationText = (location: JsonResume["basics"]["location"]) =>
  [location?.address, location?.postalCode, location?.city, location?.region, location?.countryCode]
    .map(text).filter(Boolean).join(", ");

const levelToPercent = (level: string) => ({ beginner: 35, intermediate: 60, advanced: 80, expert: 95 }[level.toLowerCase()] ?? 75);

export const importJsonResume = (value: unknown): Partial<CVData> => {
  if (!value || typeof value !== "object") throw new Error("Le fichier JSON Resume est invalide.");
  const resume = value as JsonResume;
  const name = splitName(text(resume.basics?.name));

  const experiences: Experience[] = (resume.work ?? []).map((item, index) => ({
    id: `json-resume-experience-${index}`,
    company: text(item.name),
    position: text(item.position),
    startDate: text(item.startDate),
    endDate: text(item.endDate),
    description: [text(item.summary), ...(item.highlights ?? []).map(text).filter(Boolean)].filter(Boolean).join(" "),
  }));
  const education: Education[] = (resume.education ?? []).map((item, index) => ({
    id: `json-resume-education-${index}`,
    school: text(item.institution),
    degree: [text(item.studyType), text(item.area)].filter(Boolean).join(" - "),
    startDate: text(item.startDate),
    endDate: text(item.endDate),
    description: [text(item.summary), ...(item.courses ?? []).map(text).filter(Boolean)].filter(Boolean).join(" "),
  }));
  const skills: Skill[] = (resume.skills ?? []).flatMap((item, index) => {
    const names = [text(item.name), ...(item.keywords ?? []).map(text).filter(Boolean)].filter(Boolean);
    return names.map((skillName, skillIndex) => ({ id: `json-resume-skill-${index}-${skillIndex}`, name: skillName, level: levelToPercent(text(item.level)) }));
  });

  return {
    ...name,
    email: text(resume.basics?.email),
    phone: text(resume.basics?.phone),
    address: locationText(resume.basics?.location),
    about: text(resume.basics?.summary),
    linkedin: profileUrl(resume, "linkedin"),
    github: profileUrl(resume, "github"),
    portfolio: profileUrl(resume, "portfolio") || profileUrl(resume, "website"),
    experiences,
    education,
    skills,
  };
};

export const importJsonResumeFile = async (file: File) => {
  try {
    return importJsonResume(JSON.parse(await file.text()));
  } catch (error) {
    if (error instanceof SyntaxError) throw new Error("Le fichier JSON Resume n’est pas valide.");
    throw error;
  }
};