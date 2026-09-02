import * as mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";

// Configurer le worker PDF
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface ImportedCVData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  about?: string;
  experiences?: Array<{
    position: string;
    company: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }>;
  education?: Array<{
    degree: string;
    school: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }>;
  skills?: Array<{
    name: string;
    level?: number;
  }>;
}

/**
 * Extrait le texte d'un fichier PDF en utilisant PDF.js
 */
const extractTextFromPDF = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .filter((item: any) => item.str && item.str.trim())
      .map((item: any) => item.str)
      .join(" ");
    fullText += pageText + "\n";
  }

  return fullText;
};

/**
 * Extrait le texte d'un fichier DOCX en utilisant Mammoth
 */
const extractTextFromDOCX = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

/**
 * Parse le texte extrait pour récupérer les informations du CV
 */
const parseExtractedText = (text: string): ImportedCVData => {
  const result: ImportedCVData = {};

  // Normaliser le texte
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const fullText = text.toLowerCase();

  // Extraire le prénom et le nom (généralement en haut du document)
  if (lines.length > 0) {
    const firstLine = lines[0].split(/\s+/);
    if (firstLine.length >= 1) {
      result.firstName = firstLine[0];
      if (firstLine.length >= 2) {
        result.lastName = firstLine.slice(1).join(" ");
      }
    }
  }

  // Extraire email
  const emailMatch = fullText.match(/([a-z0-9._-]+@[a-z0-9.-]+)/i);
  if (emailMatch) {
    result.email = emailMatch[1];
  }

  // Extraire téléphone
  const phoneMatch = fullText.match(/(\+?33|0)[1-9](?:\s?\d{2}){4}/);
  if (phoneMatch) {
    result.phone = phoneMatch[0];
  }

  // Extraire adresse (après "adresse" ou "localisation")
  const addressMatch = text.match(/(?:adresse|localisation)[:\s]+([^\n]+)/i);
  if (addressMatch) {
    result.address = addressMatch[1].trim();
  }

  // Extraire section "À propos" ou "Professionnel"
  const aboutMatch = text.match(
    /(?:à propos|professionnel|résumé professionnel|profil)[:\s]+([^]*?)(?=\n(?:expérience|formation|compétence|skill|education|experience)|$)/i
  );
  if (aboutMatch) {
    result.about = aboutMatch[1]
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(0, 3)
      .join(" ");
  }

  // Extraire expériences
  const experienceMatch = text.match(
    /(?:expérience|experience)[:\s]*([^]*?)(?=\n(?:formation|compétence|skill|education)|$)/i
  );
  if (experienceMatch) {
    result.experiences = [];
    const expText = experienceMatch[1];
    // Chercher les patterns de position et entreprise
    const companyMatches = expText.match(/(?:chez|at|@)\s*([^\n]+)/gi);
    const positionMatches = expText.match(/(?:poste|position|titre|role|as|en tant que)\s*[:=]?\s*([^\n]+)/gi);

    if (companyMatches || positionMatches) {
      for (let i = 0; i < Math.max(companyMatches?.length || 0, positionMatches?.length || 0); i++) {
        result.experiences.push({
          company: companyMatches?.[i]?.replace(/(?:chez|at|@)\s*/i, "").trim() || "Entreprise",
          position: positionMatches?.[i]?.replace(/(?:poste|position|titre|role|as|en tant que)\s*[:=]?\s*/i, "").trim() || "Poste",
        });
      }
    }
  }

  // Extraire formations
  const educationMatch = text.match(
    /(?:formation|education|études|studies)[:\s]*([^]*?)(?=\n(?:compétence|skill|expérience|experience)|$)/i
  );
  if (educationMatch) {
    result.education = [];
    const eduText = educationMatch[1];
    const schoolMatches = eduText.match(/(?:à|at|école|school|université|university)\s*([^\n]+)/gi);
    const degreeMatches = eduText.match(/(?:diplôme|degree|licence|master|bac|bacheior|bachelor)\s*[:=]?\s*([^\n]+)/gi);

    if (schoolMatches || degreeMatches) {
      for (let i = 0; i < Math.max(schoolMatches?.length || 0, degreeMatches?.length || 0); i++) {
        result.education.push({
          school: schoolMatches?.[i]?.replace(/(?:à|at|école|school|université|university)\s*/i, "").trim() || "École",
          degree: degreeMatches?.[i]?.replace(/(?:diplôme|degree|licence|master|bac|bachelor)\s*[:=]?\s*/i, "").trim() || "Diplôme",
        });
      }
    }
  }

  // Extraire compétences
  const skillsMatch = text.match(/(?:compétences|skills|expertise)[:\s]*([^]*?)(?=\n|$)/i);
  if (skillsMatch) {
    result.skills = skillsMatch[1]
      .split(/[,•\n-]/)
      .map((skill) => skill.trim())
      .filter(Boolean)
      .slice(0, 8)
      .map((skill) => ({
        name: skill,
        level: 75,
      }));
  }

  return result;
};

/**
 * Importe un fichier PDF ou DOCX et extrait les données du CV
 */
export const importCVFromFile = async (file: File): Promise<ImportedCVData> => {
  const fileName = file.name.toLowerCase();

  try {
    let extractedText = "";

    if (fileName.endsWith(".pdf")) {
      extractedText = await extractTextFromPDF(file);
    } else if (fileName.endsWith(".docx") || fileName.endsWith(".doc")) {
      extractedText = await extractTextFromDOCX(file);
    } else {
      throw new Error("Format de fichier non supporté. Veuillez utiliser PDF ou DOCX.");
    }

    if (!extractedText || extractedText.trim().length === 0) {
      throw new Error("Impossible d'extraire le texte du fichier. Veuillez vérifier que le fichier n'est pas vide.");
    }

    return parseExtractedText(extractedText);
  } catch (error) {
    console.error("Erreur lors de l'import du CV:", error);
    throw error;
  }
};
