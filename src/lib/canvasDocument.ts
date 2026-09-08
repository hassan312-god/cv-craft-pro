import type { CVData } from "@/pages/CVCreate";

/**
 * Modèle de document de l'éditeur canvas.
 *
 * Un CV est une page A4 (794 × 1123 px à 96 dpi) sur laquelle des blocs sont
 * positionnés librement. Deux familles de blocs coexistent :
 *
 * - les blocs « libres » (`text`, `heading`, `image`, `shape`, `divider`) dont
 *   le contenu est saisi directement sur le canvas ;
 * - les blocs « liés » (`section`) qui affichent en direct une partie des
 *   données du formulaire (expériences, formations, compétences…), afin que la
 *   mise en page reste synchronisée avec le CV saisi.
 */

export const PAGE_WIDTH = 794;
export const PAGE_HEIGHT = 1123;

export type CanvasElementType = "text" | "heading" | "image" | "shape" | "divider" | "section";

/** Champ du CV rendu par un bloc `section`. */
export type CanvasSectionKind =
  | "identity"
  | "contact"
  | "about"
  | "experiences"
  | "education"
  | "skills"
  | "socials";

export interface CanvasElementStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
  color: string;
  background: string;
  align: "left" | "center" | "right";
  italic: boolean;
  underline: boolean;
  uppercase: boolean;
  padding: number;
  radius: number;
  borderWidth: number;
  borderColor: string;
  opacity: number;
}

export interface CanvasElement {
  id: string;
  type: CanvasElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  /** Ordre d'empilement : le plus grand est au-dessus. */
  z: number;
  locked: boolean;
  /** Texte libre (`text`, `heading`) ou URL (`image`). */
  content: string;
  /** Donnée du CV affichée quand `type === "section"`. */
  section?: CanvasSectionKind;
  style: CanvasElementStyle;
}

export interface CanvasDocument {
  version: 1;
  width: number;
  height: number;
  background: string;
  /** Couleur d'accent du modèle, réutilisée par les blocs liés. */
  accent: string;
  fontFamily: string;
  presetId: string;
  elements: CanvasElement[];
}

export const DEFAULT_FONT = "'Inter', system-ui, -apple-system, sans-serif";

export const FONT_CHOICES: { label: string; value: string }[] = [
  { label: "Inter (sans-serif)", value: DEFAULT_FONT },
  { label: "Georgia (serif)", value: "Georgia, 'Times New Roman', serif" },
  { label: "Times New Roman", value: "'Times New Roman', Times, serif" },
  { label: "Helvetica / Arial", value: "Helvetica, Arial, sans-serif" },
  { label: "Courier (mono)", value: "'Courier New', Courier, monospace" },
  { label: "Trebuchet", value: "'Trebuchet MS', sans-serif" },
];

export const defaultStyle = (overrides: Partial<CanvasElementStyle> = {}): CanvasElementStyle => ({
  fontFamily: DEFAULT_FONT,
  fontSize: 14,
  fontWeight: 400,
  lineHeight: 1.45,
  letterSpacing: 0,
  color: "#1f2937",
  background: "transparent",
  align: "left",
  italic: false,
  underline: false,
  uppercase: false,
  padding: 0,
  radius: 0,
  borderWidth: 0,
  borderColor: "#e5e7eb",
  opacity: 1,
  ...overrides,
});

let idCounter = 0;
export const createElementId = (): string => {
  idCounter += 1;
  return `el-${Date.now().toString(36)}-${idCounter.toString(36)}`;
};

export const createElement = (
  type: CanvasElementType,
  overrides: Partial<CanvasElement> = {},
): CanvasElement => {
  const base: CanvasElement = {
    id: createElementId(),
    type,
    x: 80,
    y: 80,
    width: type === "divider" ? 240 : 260,
    height: type === "divider" ? 2 : type === "heading" ? 44 : 80,
    z: 1,
    locked: false,
    content: "",
    style: defaultStyle(),
  };

  if (type === "heading") {
    base.content = "Titre de section";
    base.style = defaultStyle({ fontSize: 22, fontWeight: 700, color: "#111827" });
  }
  if (type === "text") {
    base.content = "Cliquez deux fois pour modifier ce texte.";
  }
  if (type === "shape") {
    base.style = defaultStyle({ background: "#e5e7eb", radius: 8 });
    base.height = 120;
  }
  if (type === "divider") {
    base.style = defaultStyle({ background: "#111827" });
  }
  if (type === "image") {
    base.width = 140;
    base.height = 140;
    base.style = defaultStyle({ radius: 999, background: "#f3f4f6" });
  }

  return { ...base, ...overrides, style: { ...base.style, ...(overrides.style ?? {}) } };
};

/** Borne un bloc à l'intérieur de la page. */
export const clampElement = (element: CanvasElement, doc: CanvasDocument): CanvasElement => ({
  ...element,
  x: Math.round(Math.min(Math.max(element.x, -element.width + 24), doc.width - 24)),
  y: Math.round(Math.min(Math.max(element.y, -element.height + 24), doc.height - 24)),
  width: Math.round(Math.max(16, element.width)),
  height: Math.round(Math.max(2, element.height)),
});

export const topZ = (doc: CanvasDocument): number =>
  doc.elements.reduce((max, element) => Math.max(max, element.z), 0);

/** Un document est-il exploitable (garde-fou pour les données restaurées) ? */
export const isCanvasDocument = (value: unknown): value is CanvasDocument => {
  if (!value || typeof value !== "object") return false;
  const doc = value as Partial<CanvasDocument>;
  return doc.version === 1 && Array.isArray(doc.elements) && typeof doc.width === "number";
};

/* ------------------------------------------------------------------ */
/* Contenu des blocs liés aux données du CV                            */
/* ------------------------------------------------------------------ */

export interface SectionLine {
  /** Ligne mise en avant (intitulé de poste, école, nom…). */
  primary?: string;
  /** Ligne secondaire (entreprise, diplôme…). */
  secondary?: string;
  /** Métadonnée alignée à droite (dates). */
  meta?: string;
  /** Corps de texte. */
  body?: string;
  /** Valeur 0-100 pour les barres de compétences. */
  level?: number;
}

const formatMonth = (value?: string): string => {
  if (!value) return "";
  const [year, month] = value.split("-");
  if (!year) return value;
  if (!month) return year;
  const date = new Date(Number(year), Number(month) - 1, 1);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("fr-FR", { month: "short", year: "numeric" });
};

export const formatPeriod = (start?: string, end?: string): string => {
  const from = formatMonth(start);
  const to = end ? formatMonth(end) : "Aujourd'hui";
  if (!from && !end) return "";
  return from ? `${from} — ${to}` : to;
};

/** Transforme une partie du CV en lignes affichables par un bloc `section`. */
export const sectionLines = (kind: CanvasSectionKind, cv: CVData): SectionLine[] => {
  switch (kind) {
    case "identity":
      return [
        {
          primary: `${cv.firstName ?? ""} ${cv.lastName ?? ""}`.trim() || "Votre Nom",
          secondary: cv.experiences?.[0]?.position || "",
        },
      ];
    case "contact":
      return [cv.email, cv.phone, cv.address]
        .filter((value) => Boolean(value && value.trim()))
        .map((value) => ({ body: value as string }));
    case "about":
      return cv.about ? [{ body: cv.about }] : [];
    case "experiences":
      return (cv.experiences ?? []).map((exp) => ({
        primary: exp.position,
        secondary: exp.company,
        meta: formatPeriod(exp.startDate, exp.endDate),
        body: exp.description,
      }));
    case "education":
      return (cv.education ?? []).map((edu) => ({
        primary: edu.degree,
        secondary: edu.school,
        meta: formatPeriod(edu.startDate, edu.endDate),
        body: edu.description,
      }));
    case "skills":
      return (cv.skills ?? []).map((skill) => ({
        primary: skill.name,
        level: Math.max(0, Math.min(100, skill.level ?? 0)),
      }));
    case "socials":
      return [cv.linkedin, cv.github, cv.twitter, cv.portfolio]
        .filter((value) => Boolean(value && value.trim()))
        .map((value) => ({ body: value as string }));
    default:
      return [];
  }
};

export const SECTION_LABELS: Record<CanvasSectionKind, string> = {
  identity: "Nom & titre",
  contact: "Coordonnées",
  about: "À propos",
  experiences: "Expériences",
  education: "Formation",
  skills: "Compétences",
  socials: "Liens & réseaux",
};
