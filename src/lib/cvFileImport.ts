import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth/mammoth.browser";
import type { CVData, Education, Experience, Skill } from "@/pages/CVCreate";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

const sectionNames = /^(profil|à propos|a propos|expériences?|experiences?|formation|éducation|education|compétences?|competences?|skills|contact)$/i;
const cleanLines = (text: string) => text.split(/\r?\n/).map((line) => line.replace(/\s+/g, " ").trim()).filter(Boolean);

const getSection = (lines: string[], names: RegExp) => {
  const start = lines.findIndex((line) => names.test(line));
  if (start < 0) return [];
  const result: string[] = [];
  for (const line of lines.slice(start + 1)) {
    if (sectionNames.test(line)) break;
    result.push(line);
  }
  return result;
};

const parseText = (text: string): Partial<CVData> => {
  const lines = cleanLines(text);
  const email = text.match(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/)?.[0] ?? "";
  const phone = text.match(/(?:\+33|0)[1-9](?:[ .-]?\d{2}){4}/)?.[0] ?? "";
  const contactIndex = email ? lines.findIndex((line) => line.includes(email)) : -1;
  const nameParts = (lines[0] && !sectionNames.test(lines[0]) ? lines[0] : "").split(" ");
  const aboutLines = getSection(lines, /^(profil|à propos|a propos)$/i);
  const skillLines = getSection(lines, /^(compétences?|competences?|skills)$/i);
  const educationLines = getSection(lines, /^(formation|éducation|education)$/i);
  const experienceLines = getSection(lines, /^(expériences?|experiences?)$/i);
  const skills: Skill[] = skillLines.join(",").split(/[,;|•]/).map((name) => name.trim()).filter(Boolean).slice(0, 20).map((name, index) => ({ id: `imported-skill-${index}`, name, level: 75 }));
  const education: Education[] = educationLines.length ? [{ id: "imported-education-1", school: educationLines[0] ?? "", degree: educationLines[1] ?? "", startDate: "", endDate: "", description: educationLines.slice(2).join(" ") }] : [];
  const experiences: Experience[] = experienceLines.length ? [{ id: "imported-experience-1", company: experienceLines[1] ?? "", position: experienceLines[0] ?? "", startDate: "", endDate: "", description: experienceLines.slice(2).join(" ") }] : [];
  return {
    firstName: nameParts.length > 1 ? nameParts[0] : "",
    lastName: nameParts.length > 1 ? nameParts.slice(1).join(" ") : "",
    email,
    phone,
    address: contactIndex >= 0 ? lines[contactIndex + 1] ?? "" : "",
    about: aboutLines.join(" ") || lines.slice(1, 4).join(" "),
    skills,
    education,
    experiences,
  };
};

const extractPdfText = async (file: File) => {
  const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
  const pages: string[] = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    pages.push(content.items.map((item) => ("str" in item ? item.str : "")).join("\n"));
  }
  return pages.join("\n");
};

export const importCVFile = async (file: File): Promise<Partial<CVData>> => {
  const extension = file.name.toLowerCase().split(".").pop();
  let text: string;
  if (extension === "pdf") text = await extractPdfText(file);
  else if (extension === "docx") text = (await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() })).value;
  else throw new Error("Format non pris en charge. Utilisez un fichier PDF ou DOCX.");
  if (!text.trim()) throw new Error("Aucun texte lisible n’a été trouvé dans ce fichier.");
  return parseText(text);
};