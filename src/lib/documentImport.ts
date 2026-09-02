import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export type ImportedCVData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  about?: string;
  skills: Array<{ id: string; name: string; level: number }>;
  experiences: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
};

const normalizeText = (text: string) =>
  text
    .replace(/\u00a0/g, " ")
    .replace(/\r/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

const toId = (value: string) => `${value.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Math.random().toString(36).slice(2, 9)}`;

const extractEmail = (text: string) => /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.exec(text)?.[0] ?? "";

const extractPhone = (text: string) => {
  const match = /(?:\+\d{1,3}[-.\s]?)?(?:\d{1,4}[-.\s]?)?(?:\d{2}[-.\s]?){4,5}\d{2,}/.exec(text);
  return match?.[0]?.replace(/\s+/g, " ").trim() ?? "";
};

const extractName = (text: string) => {
  const lines = text
    .split(/\n|\r/)
    .map((line) => line.trim())
    .filter(Boolean);

  const candidates = lines.slice(0, 6).filter((line) => !/[@]|\d/.test(line) && line.split(" ").length <= 4 && line.length > 2);
  const direct = candidates.find((line) => /[A-ZÀ-ÖØ-Þ][a-zà-öø-ÿ]/.test(line));
  if (!direct) return { firstName: "", lastName: "" };

  const parts = direct.split(/\s+/);
  if (parts.length >= 2) {
    return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
  }

  return { firstName: direct, lastName: "" };
};

const extractAddress = (text: string) => {
  const lines = text.split(/\n|\r/).map((line) => line.trim()).filter(Boolean);
  for (const line of lines) {
    if (/(France|Paris|Lyon|Marseille|Bordeaux|Nice|Nantes|Belgique|Suisse|Montréal|London|Berlin)/i.test(line)) {
      return line;
    }
  }
  return "";
};

const extractSummary = (text: string) => {
  const patterns = [
    /(?:A\s*propos|Profil|Présentation|Summary|About)[\s:.-]*(.*?)(?=(?:Expériences|Experience|Formation|Education|Compétences|Skills|Langues|Contact))/is,
    /(?:A\s*propos|Profil|Présentation|Summary|About)[\s:.-]*(.*)/is,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1]) {
      const summary = normalizeText(match[1]).slice(0, 500);
      if (summary.length > 20) return summary;
    }
  }

  const about = text
    .split(/\n|\r/)
    .map((line) => line.trim())
    .find((line) => line.length > 40 && !/[A-Z]{2,}:/i.test(line) && !/[0-9]{4}/.test(line));

  return about ? normalizeText(about) : "";
};

const extractSkills = (text: string) => {
  const sections = [
    /(?:Compétences|Skills|Compétency)[\s:.-]*([\s\S]*?)(?=(?:Expériences|Experience|Formation|Education|Langues|Centres|Interêts|Contact))/i,
    /(?:Compétences|Skills|Compétency)[\s:.-]*([\s\S]*)/i,
  ];

  for (const section of sections) {
    const match = text.match(section);
    if (match?.[1]) {
      const raw = match[1]
        .replace(/[•\-•]/g, ",")
        .split(/[;,\n]/)
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, 12);

      if (raw.length > 0) {
        return raw.map((name, index) => ({
          id: toId(name),
          name,
          level: Math.min(95, 65 + index * 3),
        }));
      }
    }
  }

  return [];
};

const extractExperienceEntries = (text: string) => {
  const matches = [...text.matchAll(/([A-ZÀ-ÖØ-Þ][^\n]{2,})\s*(?:\n|\s)*\(([^\n]+)\)\s*(?:\n|\s)*([A-ZÀ-ÖØ-Þ][^\n]{1,80})/gi)];
  if (matches.length > 0) {
    return matches.slice(0, 3).map((match) => ({
      id: toId(match[1] ?? "experience"),
      company: (match[2] ?? "").trim(),
      position: (match[1] ?? "").trim(),
      startDate: "",
      endDate: "",
      description: (match[3] ?? "").trim(),
    }));
  }

  const lines = text.split(/\n|\r/).map((line) => line.trim()).filter(Boolean);
  const arr: Array<{ id: string; company: string; position: string; startDate: string; endDate: string; description: string }> = [];
  for (let i = 0; i < lines.length - 1; i++) {
    const current = lines[i];
    const next = lines[i + 1];
    if (current && next && current.length > 2 && next.length > 2 && !/[0-9]{4}/.test(current) && !/[A-Z]{2,}:/i.test(current)) {
      arr.push({
        id: toId(current),
        company: current,
        position: next,
        startDate: "",
        endDate: "",
        description: "",
      });
    }
  }
  return arr.slice(0, 3);
};

const extractEducationEntries = (text: string) => {
  const lines = text.split(/\n|\r/).map((line) => line.trim()).filter(Boolean);
  const items: Array<{ id: string; school: string; degree: string; startDate: string; endDate: string; description: string }> = [];
  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i];
    const next = lines[i + 1];
    if (/(Bachelor|Master|Diplôme|Licence|Formation|Université|Ecole|Institut|MBA)/i.test(line) && next) {
      items.push({
        id: toId(line),
        school: next,
        degree: line,
        startDate: "",
        endDate: "",
        description: "",
      });
    }
  }

  return items.slice(0, 2);
};

export const extractTextFromPDF = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = "";

  for (let pageIndex = 1; pageIndex <= pdf.numPages; pageIndex += 1) {
    const page = await pdf.getPage(pageIndex);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => ("str" in item ? item.str : ""))
      .join(" ");
    fullText += `\n${pageText}`;
  }

  return normalizeText(fullText);
};

export const extractTextFromDoc = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return normalizeText(result.value || "");
};

export const parseCVFromDocumentText = (text: string): ImportedCVData => {
  const cleaned = normalizeText(text);
  const email = extractEmail(cleaned);
  const phone = extractPhone(cleaned);
  const { firstName, lastName } = extractName(cleaned);
  const address = extractAddress(cleaned);

  return {
    firstName,
    lastName,
    email,
    phone,
    address,
    about: extractSummary(cleaned),
    skills: extractSkills(cleaned),
    experiences: extractExperienceEntries(cleaned),
    education: extractEducationEntries(cleaned),
  };
};

export const extractDocumentText = async (file: File) => {
  const name = file.name.toLowerCase();
  if (name.endsWith(".pdf") || file.type === "application/pdf") {
    return extractTextFromPDF(file);
  }
  if (name.endsWith(".docx") || file.type.includes("wordprocessingml") || name.endsWith(".doc")) {
    return extractTextFromDoc(file);
  }
  if (name.endsWith(".txt") || file.type.startsWith("text/")) {
    return file.text();
  }

  throw new Error("Format de document non pris en charge. Utilisez PDF, DOC, DOCX ou TXT.");
};
