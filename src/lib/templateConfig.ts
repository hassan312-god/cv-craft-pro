import { TemplateDarkSidebar } from "@/components/templates/TemplateDarkSidebar";
import { TemplateAzurill } from "@/components/templates/TemplateAzurill";
import { TemplateBronzor } from "@/components/templates/TemplateBronzor";
import { TemplateChikorita } from "@/components/templates/TemplateChikorita";
import { TemplateCorporate } from "@/components/templates/TemplateCorporate";
import { TemplateGradient } from "@/components/templates/TemplateGradient";
import { TemplateCompact } from "@/components/templates/TemplateCompact";
import { TemplatePhotoBanner } from "@/components/templates/TemplatePhotoBanner";
import { TemplateModernMinimal } from "@/components/templates/TemplateModernMinimal";
import { TemplateColorful } from "@/components/templates/TemplateColorful";

// Template 1 - Minimal
import { TemplateMinimal } from "@/components/templates/TemplateMinimal";
// Template 2 - Executive
import { TemplateExecutive } from "@/components/templates/TemplateExecutive";
// Template 3 - Creative
import { TemplateCreative } from "@/components/templates/TemplateCreative";
// Template 4 - Modern (keep existing)
import { TemplateModern as TemplateModernNew } from "@/components/templates/TemplateModern";
// Template 5 - Professional
import { TemplateProfessional } from "@/components/templates/TemplateProfessional";
// Template 6 - Elegant
import { TemplateElegant } from "@/components/templates/TemplateElegant";
// Template 7 - Tech
import { TemplateTech } from "@/components/templates/TemplateTech";
// Template 8 - Classic
import { TemplateClassic } from "@/components/templates/TemplateClassic";
// Template 9 - Bold
import { TemplateBold } from "@/components/templates/TemplateBold";
// Template 10 - Clean
import { TemplateClean } from "@/components/templates/TemplateClean";

// Templates with Photo Integration
import { TemplatePhotoHeader } from "@/components/templates/TemplatePhotoHeader";
import { TemplatePhotoSidebar } from "@/components/templates/TemplatePhotoSidebar";
import { TemplatePhotoCentered } from "@/components/templates/TemplatePhotoCentered";
import { TemplatePhotoLarge } from "@/components/templates/TemplatePhotoLarge";
import { TemplatePhotoCorner } from "@/components/templates/TemplatePhotoCorner";

// Additional Templates
import { TemplateSidebar } from "@/components/templates/TemplateSidebar";
import { TemplateTwoColumn } from "@/components/templates/TemplateTwoColumn";
import { TemplateTimeline } from "@/components/templates/TemplateTimeline";
import { TemplatePhotoModern } from "@/components/templates/TemplatePhotoModern";
import { TemplatePhotoCompact } from "@/components/templates/TemplatePhotoCompact";

export type TemplateCategory = 
  | "all"
  | "minimalist"
  | "professional"
  | "creative"
  | "with-photo"
  | "modern"
  | "classic";

export interface TemplateConfigItem {
  id: string;
  name: string;
  component: any;
  preview: string;
  description: string;
  category: TemplateCategory;
}

export const templateCategories: Record<TemplateCategory, string> = {
  all: "Tous",
  minimalist: "Minimaliste",
  professional: "Professionnel",
  creative: "Créatif",
  "with-photo": "Avec Photo",
  modern: "Moderne",
  classic: "Classique"
};

export const templateConfig: TemplateConfigItem[] = [
  { id: 'pro-01', name: 'Executive', component: TemplateExecutive, preview: '/templates/pro-01.png', description: 'Structure solide et premium pour profils seniors.', category: 'professional' },
  { id: 'pro-02', name: 'Corporate', component: TemplateProfessional, preview: '/templates/pro-02.png', description: 'Mise en page corporate claire et rassurante.', category: 'professional' },
  { id: 'pro-03', name: 'Elegant', component: TemplateElegant, preview: '/templates/pro-03.png', description: 'Palette raffinée pour un profil haut de gamme.', category: 'professional' },
  { id: 'pro-04', name: 'Board', component: TemplateDarkSidebar, preview: '/templates/pro-04.png', description: 'Profil structuré avec_sidebar contrasté.', category: 'professional' },
  { id: 'pro-05', name: 'Prestige', component: TemplateCorporate, preview: '/templates/pro-05.png', description: 'Présentation élégante pour cadres et consultants.', category: 'professional' },
  { id: 'pro-06', name: 'Professional', component: TemplateProfessional, preview: '/templates/pro-06.png', description: 'Modèle classique orienté performance.', category: 'professional' },
  { id: 'pro-07', name: 'Manager', component: TemplateSidebar, preview: '/templates/pro-07.png', description: 'Layout adapté aux postes de direction.', category: 'professional' },
  { id: 'pro-08', name: 'Executive Suite', component: TemplateExecutive, preview: '/templates/pro-08.png', description: 'Densité maîtrisée pour profils de responsabilité.', category: 'professional' },
  { id: 'pro-09', name: 'Prime', component: TemplateElegant, preview: '/templates/pro-09.png', description: 'Palette premium et lisibilité forte.', category: 'professional' },
  { id: 'pro-10', name: 'Summit', component: TemplateDarkSidebar, preview: '/templates/pro-10.png', description: 'Version plus imposante pour carrières senior.', category: 'professional' },
  { id: 'pro-11', name: 'Director', component: TemplateSidebar, preview: '/templates/pro-11.png', description: 'Format lisible pour fonctions dirigeantes.', category: 'professional' },
  { id: 'pro-12', name: 'Atlas', component: TemplateCorporate, preview: '/templates/pro-12.png', description: 'Template fiable pour environnements corporatifs.', category: 'professional' },
  { id: 'pro-13', name: 'Verve', component: TemplateProfessional, preview: '/templates/pro-13.png', description: 'Style professionnel avec dynamisme discret.', category: 'professional' },
  { id: 'pro-14', name: 'Panorama', component: TemplateExecutive, preview: '/templates/pro-14.png', description: 'Conception claire avec forte hiérarchie.', category: 'professional' },

  { id: 'modern-01', name: 'Modern One', component: TemplateModernNew, preview: '/templates/modern-01.png', description: 'Design contemporain avec mise en page fluide.', category: 'modern' },
  { id: 'modern-02', name: 'Contour', component: TemplateModernMinimal, preview: '/templates/modern-02.png', description: 'Ligne épurée et mise en page équilibrée.', category: 'modern' },
  { id: 'modern-03', name: 'Pulse', component: TemplateGradient, preview: '/templates/modern-03.png', description: 'Blocs dynamiques et ton moderne.', category: 'modern' },
  { id: 'modern-04', name: 'Current', component: TemplateTwoColumn, preview: '/templates/modern-04.png', description: 'Disposition moderne et lisible.', category: 'modern' },
  { id: 'modern-05', name: 'Trend', component: TemplateTimeline, preview: '/templates/modern-05.png', description: 'Approche visuelle structurée par étapes.', category: 'modern' },
  { id: 'modern-06', name: 'Signal', component: TemplateTech, preview: '/templates/modern-06.png', description: 'Style ultra contemporain pour profils tech.', category: 'modern' },
  { id: 'modern-07', name: 'Orbit', component: TemplateModernMinimal, preview: '/templates/modern-07.png', description: 'Équilibre entre minimalisme et présence.', category: 'modern' },
  { id: 'modern-08', name: 'Vector', component: TemplateGradient, preview: '/templates/modern-08.png', description: 'Palette moderne et bloc d’information net.', category: 'modern' },
  { id: 'modern-09', name: 'Studio', component: TemplateTwoColumn, preview: '/templates/modern-09.png', description: 'Mise en page flexible pour profils créatifs.', category: 'modern' },
  { id: 'modern-10', name: 'Form', component: TemplateTimeline, preview: '/templates/modern-10.png', description: 'Approche ouverte et très lisible.', category: 'modern' },

  { id: 'minimal-01', name: 'Minimal', component: TemplateMinimal, preview: '/templates/minimal-01.png', description: 'Style épuré et très lisible.', category: 'minimalist' },
  { id: 'minimal-02', name: 'Clean', component: TemplateClean, preview: '/templates/minimal-02.png', description: 'Mise en page ultra claire.', category: 'minimalist' },
  { id: 'minimal-03', name: 'Air', component: TemplateMinimal, preview: '/templates/minimal-03.png', description: 'Palette douce pour profils sobres.', category: 'minimalist' },
  { id: 'minimal-04', name: 'Compact', component: TemplateCompact, preview: '/templates/minimal-04.png', description: 'Version compacte et efficace.', category: 'minimalist' },
  { id: 'minimal-05', name: 'Refined', component: TemplateModernMinimal, preview: '/templates/minimal-05.png', description: 'Minimalisme premium et discret.', category: 'minimalist' },
  { id: 'minimal-06', name: 'Calm', component: TemplateClean, preview: '/templates/minimal-06.png', description: 'Design léger et rassurant.', category: 'minimalist' },
  { id: 'minimal-07', name: 'Line', component: TemplateCompact, preview: '/templates/minimal-07.png', description: 'Lignes nettes et structure légère.', category: 'minimalist' },
  { id: 'minimal-08', name: 'Focus', component: TemplateMinimal, preview: '/templates/minimal-08.png', description: 'Approche claire orientée contenu.', category: 'minimalist' },
  { id: 'minimal-09', name: 'Clear', component: TemplateModernMinimal, preview: '/templates/minimal-09.png', description: 'Format élégant sans surcharge.', category: 'minimalist' },
  { id: 'minimal-10', name: 'Balance', component: TemplateCompact, preview: '/templates/minimal-10.png', description: 'Design harmonieux et hiérarchisé.', category: 'minimalist' },

  { id: 'creative-01', name: 'Creative', component: TemplateCreative, preview: '/templates/creative-01.png', description: 'Approche visuelle dynamique et expressive.', category: 'creative' },
  { id: 'creative-02', name: 'Bold', component: TemplateBold, preview: '/templates/creative-02.png', description: 'Impact visuel fort et personnalité affirmée.', category: 'creative' },
  { id: 'creative-03', name: 'Color', component: TemplateColorful, preview: '/templates/creative-03.png', description: 'Mise en scène colorée sans perdre la lisibilité.', category: 'creative' },
  { id: 'creative-04', name: 'Canvas', component: TemplateCreative, preview: '/templates/creative-04.png', description: 'Mise en page expressive avec forte identité.', category: 'creative' },
  { id: 'creative-05', name: 'Forme', component: TemplateBold, preview: '/templates/creative-05.png', description: 'Lignes dynamiques et accents marqués.', category: 'creative' },
  { id: 'creative-06', name: 'Vivid', component: TemplateColorful, preview: '/templates/creative-06.png', description: 'Palette forte pour profils créatifs.', category: 'creative' },
  { id: 'creative-07', name: 'Impact', component: TemplateCreative, preview: '/templates/creative-07.png', description: 'Structure visuelle engagée.', category: 'creative' },
  { id: 'creative-08', name: 'Motion', component: TemplateBold, preview: '/templates/creative-08.png', description: 'Proposition visuelle forte et mémorable.', category: 'creative' },
  { id: 'creative-09', name: 'Spark', component: TemplateColorful, preview: '/templates/creative-09.png', description: 'Design coloré et vivant.', category: 'creative' },
  { id: 'creative-10', name: 'Draft', component: TemplateCreative, preview: '/templates/creative-10.png', description: 'Version créative orientée singularité.', category: 'creative' },

  { id: 'classic-01', name: 'Classic', component: TemplateClassic, preview: '/templates/classic-01.png', description: 'Format traditionnel et élégant.', category: 'classic' },
  { id: 'classic-02', name: 'Heritage', component: TemplateClassic, preview: '/templates/classic-02.png', description: 'Mise en page intemporelle.', category: 'classic' },
  { id: 'classic-03', name: 'Legacy', component: TemplateClassic, preview: '/templates/classic-03.png', description: 'Approche rassurante pour profils établis.', category: 'classic' },
  { id: 'classic-04', name: 'Formal', component: TemplateClassic, preview: '/templates/classic-04.png', description: 'Style formel et très lisible.', category: 'classic' },
  { id: 'classic-05', name: 'Standard', component: TemplateClassic, preview: '/templates/classic-05.png', description: 'Modèle classique adapté à la plupart des profils.', category: 'classic' },

  { id: 'photo-01', name: 'Portrait', component: TemplatePhotoHeader, preview: '/templates/photo-01.png', description: 'Photo intégrée dans l’en-tête.', category: 'with-photo' },
  { id: 'photo-02', name: 'Profile', component: TemplatePhotoSidebar, preview: '/templates/photo-02.png', description: 'Version photo sidebar très professionnelle.', category: 'with-photo' },
  { id: 'photo-03', name: 'Frame', component: TemplatePhotoCentered, preview: '/templates/photo-03.png', description: 'Photo centrée avec balance visuelle.', category: 'with-photo' },
  { id: 'photo-04', name: 'Display', component: TemplatePhotoModern, preview: '/templates/photo-04.png', description: 'Template photo moderne et premium.', category: 'with-photo' },
  { id: 'photo-05', name: 'Highlight', component: TemplatePhotoCompact, preview: '/templates/photo-05.png', description: 'Disposition compacte avec photo marquante.', category: 'with-photo' }
];

export const getTemplateComponent = (templateId: string) => {
  const template = templateConfig.find(t => t.id === templateId);
  return template?.component || templateConfig[0].component;
};

