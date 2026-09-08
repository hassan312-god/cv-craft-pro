import {
  CanvasDocument,
  CanvasElement,
  CanvasSectionKind,
  DEFAULT_FONT,
  PAGE_HEIGHT,
  PAGE_WIDTH,
  createElement,
  defaultStyle,
  isCanvasDocument,
} from "@/lib/canvasDocument";

/**
 * Modèles de départ de l'éditeur canvas.
 *
 * Un modèle n'est qu'un point de départ : une fois chargé, chaque bloc est
 * librement déplaçable, redimensionnable et restylable par l'utilisateur.
 */

export type PresetCategory =
  | "ats"
  | "simple"
  | "professionnel"
  | "deux-colonnes"
  | "moderne"
  | "creatif";

export const PRESET_CATEGORIES: Record<PresetCategory, string> = {
  ats: "ATS",
  simple: "Simple",
  professionnel: "Professionnel",
  "deux-colonnes": "Deux colonnes",
  moderne: "Moderne",
  creatif: "Créatif",
};

export interface CanvasPreset {
  id: string;
  name: string;
  description: string;
  category: PresetCategory;
  /** Étiquettes affichées sur la carte de la galerie. */
  tags: string[];
  accent: string;
  /** Aperçu simplifié affiché dans la liste des modèles. */
  swatch: string[];
  build: (accent: string) => CanvasDocument;
}

let z = 0;
const nextZ = () => (z += 1);

type Build = Omit<Partial<CanvasElement>, "style"> & { style?: Partial<CanvasElement["style"]> };

const shape = (x: number, y: number, width: number, height: number, background: string, radius = 0) =>
  createElement("shape", { x, y, width, height, z: nextZ(), style: defaultStyle({ background, radius }) });

const heading = (text: string, x: number, y: number, width: number, options: Build = {}) =>
  createElement("heading", {
    x,
    y,
    width,
    height: 28,
    z: nextZ(),
    content: text,
    ...options,
    style: defaultStyle({ fontSize: 13, fontWeight: 700, letterSpacing: 2, uppercase: true, ...options.style }),
  });

const section = (kind: CanvasSectionKind, x: number, y: number, width: number, height: number, options: Build = {}) =>
  createElement("section", {
    x,
    y,
    width,
    height,
    z: nextZ(),
    section: kind,
    ...options,
    style: defaultStyle({ fontSize: 11, ...options.style }),
  });

const photo = (x: number, y: number, size: number, radius = 999) =>
  createElement("image", { x, y, width: size, height: size, z: nextZ(), style: defaultStyle({ radius, background: "#f3f4f6" }) });

const rule = (x: number, y: number, width: number, color: string, thickness = 2) =>
  createElement("divider", { x, y, width, height: thickness, z: nextZ(), style: defaultStyle({ background: color }) });

const doc = (presetId: string, accent: string, elements: CanvasElement[], fontFamily = DEFAULT_FONT): CanvasDocument => ({
  version: 1,
  width: PAGE_WIDTH,
  height: PAGE_HEIGHT,
  background: "#ffffff",
  accent,
  fontFamily,
  presetId,
  elements,
});

/* ------------------------------------------------------------------ */

const buildSidebar = (accent: string): CanvasDocument => {
  z = 0;
  const light = "rgba(255,255,255,0.85)";
  return doc("sidebar", accent, [
    shape(0, 0, 280, PAGE_HEIGHT, accent),
    photo(70, 56, 140),
    section("identity", 24, 224, 232, 90, {
      style: { fontSize: 28, fontWeight: 800, color: "#ffffff", align: "center" },
    }),
    heading("Contact", 32, 344, 216, { style: { color: light } }),
    section("contact", 32, 374, 216, 90, { style: { color: light, fontSize: 11 } }),
    heading("Liens", 32, 480, 216, { style: { color: light } }),
    section("socials", 32, 510, 216, 90, { style: { color: light, fontSize: 10 } }),
    heading("Compétences", 32, 620, 216, { style: { color: light } }),
    section("skills", 32, 650, 216, 240, { style: { color: "#ffffff", fontSize: 11 } }),

    heading("Profil", 328, 64, 420, { style: { color: accent } }),
    section("about", 328, 94, 420, 90),
    heading("Expériences", 328, 208, 420, { style: { color: accent } }),
    section("experiences", 328, 238, 420, 420),
    heading("Formation", 328, 686, 420, { style: { color: accent } }),
    section("education", 328, 716, 420, 240),
  ]);
};

const buildMinimal = (accent: string): CanvasDocument => {
  z = 0;
  return doc("minimal", accent, [
    section("identity", 72, 72, 650, 96, {
      style: { fontSize: 40, fontWeight: 300, align: "center", letterSpacing: 2 },
    }),
    rule(297, 186, 200, "#111827", 1),
    section("contact", 72, 204, 650, 24, { style: { align: "center", fontSize: 11 } }),
    section("about", 72, 250, 650, 70, { style: { align: "center", fontSize: 12, italic: true } }),

    heading("Expériences", 72, 352, 650, { style: { align: "center" } }),
    rule(357, 380, 80, accent, 2),
    section("experiences", 72, 398, 650, 340),

    heading("Formation", 72, 760, 300),
    rule(72, 788, 60, accent, 2),
    section("education", 72, 806, 300, 240),

    heading("Compétences", 422, 760, 300),
    rule(422, 788, 60, accent, 2),
    section("skills", 422, 806, 300, 240),
  ]);
};

const buildTwoColumns = (accent: string): CanvasDocument => {
  z = 0;
  return doc("two-columns", accent, [
    shape(0, 0, PAGE_WIDTH, 168, "#f8fafc"),
    photo(56, 32, 104, 12),
    section("identity", 188, 44, 420, 84, { style: { fontSize: 30, fontWeight: 700 } }),
    section("contact", 620, 44, 130, 90, { style: { fontSize: 10, align: "right" } }),
    rule(0, 166, PAGE_WIDTH, accent, 3),

    heading("Profil", 56, 206, 440, { style: { color: accent } }),
    section("about", 56, 234, 440, 80),
    heading("Expériences", 56, 336, 440, { style: { color: accent } }),
    section("experiences", 56, 364, 440, 400),
    heading("Formation", 56, 792, 440, { style: { color: accent } }),
    section("education", 56, 820, 440, 230),

    shape(528, 200, 210, 856, "#f8fafc", 10),
    heading("Compétences", 548, 224, 170, { style: { color: accent } }),
    section("skills", 548, 252, 170, 320),
    heading("Liens", 548, 596, 170, { style: { color: accent } }),
    section("socials", 548, 624, 170, 140, { style: { fontSize: 10 } }),
  ]);
};

const buildCreative = (accent: string): CanvasDocument => {
  z = 0;
  return doc("creative", accent, [
    shape(0, 0, PAGE_WIDTH, 250, accent),
    shape(-60, 150, 300, 300, "rgba(255,255,255,0.12)", 999),
    photo(600, 56, 140),
    section("identity", 56, 84, 500, 110, {
      style: { fontSize: 42, fontWeight: 800, color: "#ffffff" },
    }),
    section("contact", 56, 196, 500, 40, { style: { color: "rgba(255,255,255,0.9)", fontSize: 11 } }),

    heading("À propos", 56, 292, 300, { style: { color: accent } }),
    section("about", 56, 320, 300, 130),
    heading("Compétences", 56, 476, 300, { style: { color: accent } }),
    section("skills", 56, 504, 300, 280),
    heading("Liens", 56, 810, 300, { style: { color: accent } }),
    section("socials", 56, 838, 300, 120, { style: { fontSize: 10 } }),

    shape(396, 292, 4, 700, accent, 999),
    heading("Parcours", 424, 292, 314, { style: { color: accent } }),
    section("experiences", 424, 320, 314, 440),
    heading("Formation", 424, 782, 314, { style: { color: accent } }),
    section("education", 424, 810, 314, 210),
  ]);
};

const buildExecutive = (accent: string): CanvasDocument => {
  z = 0;
  const serif = "Georgia, 'Times New Roman', serif";
  return doc(
    "executive",
    accent,
    [
      section("identity", 64, 72, 480, 96, { style: { fontSize: 36, fontWeight: 700, fontFamily: serif } }),
      section("contact", 560, 78, 176, 80, { style: { fontSize: 10, align: "right", fontFamily: serif } }),
      rule(64, 186, 672, "#111827", 2),

      heading("Synthèse", 64, 210, 672, { style: { fontFamily: serif, letterSpacing: 3 } }),
      section("about", 64, 240, 672, 76, { style: { fontFamily: serif, fontSize: 12 } }),

      heading("Expérience professionnelle", 64, 340, 672, { style: { fontFamily: serif, letterSpacing: 3 } }),
      rule(64, 366, 672, "#d1d5db", 1),
      section("experiences", 64, 382, 672, 400, { style: { fontFamily: serif, fontSize: 11 } }),

      heading("Formation", 64, 806, 320, { style: { fontFamily: serif, letterSpacing: 3 } }),
      rule(64, 832, 320, "#d1d5db", 1),
      section("education", 64, 848, 320, 200, { style: { fontFamily: serif, fontSize: 11 } }),

      heading("Compétences clés", 416, 806, 320, { style: { fontFamily: serif, letterSpacing: 3 } }),
      rule(416, 832, 320, "#d1d5db", 1),
      section("skills", 416, 848, 320, 200, { style: { fontFamily: serif, fontSize: 11 } }),
    ],
    serif,
  );
};

const buildBanner = (accent: string): CanvasDocument => {
  z = 0;
  return doc("banner", accent, [
    shape(0, 0, PAGE_WIDTH, 200, "#111827"),
    shape(0, 200, PAGE_WIDTH, 6, accent),
    photo(56, 40, 120),
    section("identity", 204, 52, 380, 96, { style: { fontSize: 32, fontWeight: 700, color: "#ffffff" } }),
    section("contact", 596, 52, 148, 96, { style: { fontSize: 10, align: "right", color: "rgba(255,255,255,0.85)" } }),

    heading("Profil", 56, 244, 682, { style: { color: accent } }),
    section("about", 56, 272, 682, 70),

    heading("Expériences", 56, 368, 400, { style: { color: accent } }),
    section("experiences", 56, 396, 400, 620),

    heading("Compétences", 496, 368, 242, { style: { color: accent } }),
    section("skills", 496, 396, 242, 260),
    heading("Formation", 496, 680, 242, { style: { color: accent } }),
    section("education", 496, 708, 242, 200),
    heading("Liens", 496, 928, 242, { style: { color: accent } }),
    section("socials", 496, 956, 242, 100, { style: { fontSize: 10 } }),
  ]);
};


/* --- Archétypes classiques, une seule colonne, densité maximale --------- */

const buildClassic = (accent: string): CanvasDocument => {
  z = 0;
  return doc("classic", accent, [
    section("identity", 64, 60, 666, 78, {
      style: { fontSize: 30, fontWeight: 700, align: "center", letterSpacing: 3, uppercase: true },
    }),
    section("contact", 64, 146, 666, 20, { style: { align: "center", fontSize: 10.5 } }),
    rule(64, 178, 666, "#111827", 2),

    heading("Profil", 64, 196, 666),
    rule(64, 218, 666, "#d1d5db", 1),
    section("about", 64, 228, 666, 62, { style: { fontSize: 10.5 } }),

    heading("Expérience professionnelle", 64, 306, 666),
    rule(64, 328, 666, "#d1d5db", 1),
    section("experiences", 64, 338, 666, 330, { style: { fontSize: 10.5 } }),

    heading("Formation", 64, 690, 666),
    rule(64, 712, 666, "#d1d5db", 1),
    section("education", 64, 722, 666, 150, { style: { fontSize: 10.5 } }),

    heading("Compétences", 64, 894, 320),
    rule(64, 916, 320, "#d1d5db", 1),
    section("skills", 64, 926, 320, 126, { style: { fontSize: 10 } }),

    heading("Liens", 412, 894, 318),
    rule(412, 916, 318, "#d1d5db", 1),
    section("socials", 412, 926, 318, 126, { style: { fontSize: 10 } }),
  ]);
};

const buildTraditional = (accent: string): CanvasDocument => {
  z = 0;
  const serif = "Georgia, 'Times New Roman', serif";
  return doc(
    "traditional",
    accent,
    [
      section("identity", 64, 58, 420, 74, { style: { fontSize: 27, fontWeight: 700, fontFamily: serif } }),
      section("contact", 500, 62, 230, 72, { style: { fontSize: 10, align: "right", fontFamily: serif } }),
      rule(64, 148, 666, accent, 3),

      heading("Résumé de carrière", 64, 168, 666, { style: { fontFamily: serif, color: accent } }),
      section("about", 64, 194, 666, 60, { style: { fontFamily: serif, fontSize: 10.5 } }),

      heading("Parcours professionnel", 64, 272, 666, { style: { fontFamily: serif, color: accent } }),
      section("experiences", 64, 298, 666, 350, { style: { fontFamily: serif, fontSize: 10.5 } }),

      heading("Formation", 64, 672, 666, { style: { fontFamily: serif, color: accent } }),
      section("education", 64, 698, 666, 150, { style: { fontFamily: serif, fontSize: 10.5 } }),

      heading("Compétences", 64, 872, 320, { style: { fontFamily: serif, color: accent } }),
      section("skills", 64, 898, 320, 130, { style: { fontFamily: serif, fontSize: 10 } }),

      heading("Contacts", 412, 872, 318, { style: { fontFamily: serif, color: accent } }),
      section("socials", 412, 898, 318, 130, { style: { fontFamily: serif, fontSize: 10 } }),
    ],
    serif,
  );
};

const buildPrimeAts = (accent: string): CanvasDocument => {
  z = 0;
  return doc("prime-ats", accent, [
    photo(64, 56, 96, 8),
    section("identity", 184, 62, 380, 76, { style: { fontSize: 26, fontWeight: 700 } }),
    section("contact", 580, 62, 150, 84, { style: { fontSize: 10, align: "right" } }),
    rule(64, 172, 666, accent, 2),

    heading("Profil professionnel", 64, 192, 666, { style: { color: accent } }),
    section("about", 64, 216, 666, 62, { style: { fontSize: 10.5 } }),

    heading("Expérience", 64, 296, 666, { style: { color: accent } }),
    section("experiences", 64, 320, 666, 340, { style: { fontSize: 10.5 } }),

    heading("Formation", 64, 684, 666, { style: { color: accent } }),
    section("education", 64, 708, 666, 150, { style: { fontSize: 10.5 } }),

    heading("Compétences", 64, 882, 666, { style: { color: accent } }),
    section("skills", 64, 906, 320, 130, { style: { fontSize: 10 } }),
    section("socials", 412, 906, 318, 130, { style: { fontSize: 10 } }),
  ]);
};

const buildPureAts = (accent: string): CanvasDocument => {
  z = 0;
  // Volontairement sans couleur ni colonne : le format le plus sûr pour les
  // logiciels de tri de candidatures.
  const ink = "#111827";
  return doc("pure-ats", accent, [
    section("identity", 64, 64, 666, 70, { style: { fontSize: 26, fontWeight: 700, color: ink } }),
    section("contact", 64, 140, 666, 22, { style: { fontSize: 10.5, color: ink } }),
    rule(64, 172, 666, ink, 1),

    heading("Résumé", 64, 190, 666, { style: { color: ink, letterSpacing: 1 } }),
    section("about", 64, 214, 666, 62, { style: { fontSize: 10.5, color: ink } }),

    heading("Expérience professionnelle", 64, 292, 666, { style: { color: ink, letterSpacing: 1 } }),
    section("experiences", 64, 316, 666, 350, { style: { fontSize: 10.5, color: ink } }),

    heading("Formation", 64, 690, 666, { style: { color: ink, letterSpacing: 1 } }),
    section("education", 64, 714, 666, 150, { style: { fontSize: 10.5, color: ink } }),

    heading("Compétences", 64, 888, 666, { style: { color: ink, letterSpacing: 1 } }),
    section("skills", 64, 912, 666, 140, { style: { fontSize: 10, color: ink } }),
  ]);
};

const buildSpecialist = (accent: string): CanvasDocument => {
  z = 0;
  return doc("specialist", accent, [
    shape(0, 0, 236, PAGE_HEIGHT, "#f1f5f9"),
    section("identity", 24, 56, 188, 96, { style: { fontSize: 23, fontWeight: 800 } }),
    heading("Contact", 24, 176, 188, { style: { color: accent } }),
    section("contact", 24, 200, 188, 84, { style: { fontSize: 10 } }),
    heading("Compétences", 24, 300, 188, { style: { color: accent } }),
    section("skills", 24, 324, 188, 250, { style: { fontSize: 10 } }),
    heading("Liens", 24, 592, 188, { style: { color: accent } }),
    section("socials", 24, 616, 188, 110, { style: { fontSize: 9.5 } }),
    heading("Formation", 24, 744, 188, { style: { color: accent } }),
    section("education", 24, 768, 188, 220, { style: { fontSize: 9.5 } }),

    heading("Profil", 274, 60, 456, { style: { color: accent } }),
    rule(274, 84, 456, accent, 2),
    section("about", 274, 96, 456, 78),
    heading("Expérience professionnelle", 274, 196, 456, { style: { color: accent } }),
    rule(274, 220, 456, accent, 2),
    section("experiences", 274, 232, 456, 820, { style: { fontSize: 10.5 } }),
  ]);
};

const buildCorporate = (accent: string): CanvasDocument => {
  z = 0;
  return doc("corporate", accent, [
    shape(0, 0, PAGE_WIDTH, 158, "#f8fafc"),
    section("identity", 64, 46, 420, 80, { style: { fontSize: 29, fontWeight: 700 } }),
    photo(636, 34, 96, 8),
    section("contact", 400, 50, 216, 78, { style: { fontSize: 10, align: "right" } }),
    rule(0, 156, PAGE_WIDTH, accent, 4),

    heading("Synthèse", 64, 186, 666, { style: { color: accent } }),
    section("about", 64, 210, 666, 60, { style: { fontSize: 10.5 } }),

    heading("Expérience", 64, 288, 450, { style: { color: accent } }),
    section("experiences", 64, 312, 450, 500, { style: { fontSize: 10.5 } }),
    heading("Formation", 64, 828, 450, { style: { color: accent } }),
    section("education", 64, 852, 450, 200, { style: { fontSize: 10.5 } }),

    shape(538, 282, 200, 400, "#f8fafc", 8),
    heading("Compétences", 558, 300, 160, { style: { color: accent } }),
    section("skills", 558, 324, 160, 336, { style: { fontSize: 10 } }),
    heading("Liens", 558, 706, 160, { style: { color: accent } }),
    section("socials", 558, 730, 160, 140, { style: { fontSize: 9.5 } }),
  ]);
};

export const canvasPresets: CanvasPreset[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Une colonne dense et sobre, adaptée à tous les secteurs.",
    category: "simple",
    tags: ["Populaire", "ATS"],
    accent: "#0f172a",
    swatch: ["#0f172a", "#ffffff"],
    build: buildClassic,
  },
  {
    id: "traditional",
    name: "Traditional",
    description: "Format classique en serif avec filet de couleur.",
    category: "professionnel",
    tags: ["ATS"],
    accent: "#1e3a8a",
    swatch: ["#1e3a8a", "#ffffff"],
    build: buildTraditional,
  },
  {
    id: "prime-ats",
    name: "Prime ATS",
    description: "Photo discrète et structure linéaire optimisée pour les ATS.",
    category: "ats",
    tags: ["ATS", "Avec photo"],
    accent: "#0d9488",
    swatch: ["#0d9488", "#f8fafc"],
    build: buildPrimeAts,
  },
  {
    id: "pure-ats",
    name: "Pure ATS",
    description: "Sans couleur ni colonne : le format le plus sûr pour les robots.",
    category: "ats",
    tags: ["ATS"],
    accent: "#111827",
    swatch: ["#111827", "#ffffff"],
    build: buildPureAts,
  },
  {
    id: "specialist",
    name: "Specialist",
    description: "Colonne latérale claire pour les compétences et le contact.",
    category: "deux-colonnes",
    tags: ["Populaire"],
    accent: "#b91c1c",
    swatch: ["#b91c1c", "#f1f5f9"],
    build: buildSpecialist,
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "En-tête sobre avec photo et encadré de compétences.",
    category: "professionnel",
    tags: ["Avec photo"],
    accent: "#1d4ed8",
    swatch: ["#1d4ed8", "#f8fafc"],
    build: buildCorporate,
  },
  {
    id: "sidebar",
    name: "Sidebar Moderne",
    description: "Colonne latérale colorée avec photo, contact et compétences.",
    category: "deux-colonnes",
    tags: ["Populaire", "Avec photo"],
    accent: "#1e40af",
    swatch: ["#1e40af", "#ffffff"],
    build: buildSidebar,
  },
  {
    id: "minimal",
    name: "Minimal Centré",
    description: "Typographie aérée et sections centrées, très lisible.",
    category: "simple",
    tags: ["ATS"],
    accent: "#0f172a",
    swatch: ["#0f172a", "#f8fafc"],
    build: buildMinimal,
  },
  {
    id: "two-columns",
    name: "Deux Colonnes",
    description: "Bandeau d'en-tête et colonne de droite pour les compétences.",
    category: "deux-colonnes",
    tags: ["Populaire", "ATS"],
    accent: "#0d9488",
    swatch: ["#0d9488", "#f8fafc"],
    build: buildTwoColumns,
  },
  {
    id: "creative",
    name: "Créatif Coloré",
    description: "En-tête pleine largeur et parcours en timeline.",
    category: "creatif",
    tags: ["Avec photo"],
    accent: "#7c3aed",
    swatch: ["#7c3aed", "#ede9fe"],
    build: buildCreative,
  },
  {
    id: "executive",
    name: "Executive Serif",
    description: "Mise en page sobre en serif pour profils seniors.",
    category: "professionnel",
    tags: ["Serif", "ATS"],
    accent: "#7f1d1d",
    swatch: ["#7f1d1d", "#ffffff"],
    build: buildExecutive,
  },
  {
    id: "banner",
    name: "Bandeau Photo",
    description: "Bandeau sombre avec photo et colonne secondaire.",
    category: "moderne",
    tags: ["Avec photo"],
    accent: "#f59e0b",
    swatch: ["#111827", "#f59e0b"],
    build: buildBanner,
  },
];

export const ACCENT_CHOICES = [
  "#1e40af",
  "#0d9488",
  "#7c3aed",
  "#be123c",
  "#f59e0b",
  "#0f172a",
  "#15803d",
  "#c2410c",
];

export const getPreset = (presetId?: string): CanvasPreset =>
  canvasPresets.find((preset) => preset.id === presetId) ?? canvasPresets[0];

export const buildPresetDocument = (presetId: string, accent?: string): CanvasDocument => {
  const preset = getPreset(presetId);
  return preset.build(accent ?? preset.accent);
};

/**
 * Mise en page à afficher pour un CV donné : celle composée dans l'éditeur si
 * elle existe, sinon un modèle canvas choisi de façon déterministe à partir de
 * l'identifiant de modèle. Tous les CV de l'application passent ainsi par le
 * même rendu, y compris ceux des galeries d'exemples.
 */
export const resolveCanvasDocument = (cvData: {
  canvas?: CanvasDocument;
  template?: string;
}): CanvasDocument => {
  if (isCanvasDocument(cvData.canvas)) return cvData.canvas;

  const key = cvData.template ?? "";
  const hash = Array.from(key).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const preset = canvasPresets[hash % canvasPresets.length];
  return preset.build(preset.accent);
};
