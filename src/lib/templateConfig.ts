import { TemplateDarkSidebar } from "@/components/templates/TemplateDarkSidebar";
import { TemplateAzurill } from "@/components/templates/TemplateAzurill";
import { TemplateBronzor } from "@/components/templates/TemplateBronzor";
import { TemplateChikorita } from "@/components/templates/TemplateChikorita";

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

export const templateConfig = [
  {
    id: 'minimal',
    name: 'Minimal',
    component: TemplateMinimal,
    preview: '/templates/minimal.png',
    description: 'Design épuré et minimaliste'
  },
  {
    id: 'executive',
    name: 'Executive',
    component: TemplateExecutive,
    preview: '/templates/executive.png',
    description: 'Style professionnel pour cadres'
  },
  {
    id: 'creative',
    name: 'Créatif',
    component: TemplateCreative,
    preview: '/templates/creative.png',
    description: 'Design créatif et coloré'
  },
  {
    id: 'modern',
    name: 'Moderne',
    component: TemplateModernNew,
    preview: '/templates/modern.png',
    description: 'Mise en page contemporaine'
  },
  {
    id: 'professional',
    name: 'Professionnel',
    component: TemplateProfessional,
    preview: '/templates/professional.png',
    description: 'Style corporate classique'
  },
  {
    id: 'elegant',
    name: 'Élégant',
    component: TemplateElegant,
    preview: '/templates/elegant.png',
    description: 'Design raffiné et élégant'
  },
  {
    id: 'tech',
    name: 'Tech',
    component: TemplateTech,
    preview: '/templates/tech.png',
    description: 'Parfait pour les développeurs'
  },
  {
    id: 'classic',
    name: 'Classique',
    component: TemplateClassic,
    preview: '/templates/classic.png',
    description: 'Mise en page traditionnelle'
  },
  {
    id: 'bold',
    name: 'Bold',
    component: TemplateBold,
    preview: '/templates/bold.png',
    description: 'Design audacieux et impactant'
  },
  {
    id: 'clean',
    name: 'Clean',
    component: TemplateClean,
    preview: '/templates/clean.png',
    description: 'Interface claire et lisible'
  },
  {
    id: 'dark-sidebar',
    name: 'Sidebar Sombre',
    component: TemplateDarkSidebar,
    preview: '/templates/dark-sidebar.png',
    description: 'Sidebar gris foncé professionnel'
  },
  {
    id: 'azurill',
    name: 'Azurill',
    component: TemplateAzurill,
    preview: '/templates/azurill.png',
    description: 'Header centré avec photo'
  },
  {
    id: 'bronzor',
    name: 'Bronzor',
    component: TemplateBronzor,
    preview: '/templates/bronzor.png',
    description: 'Minimaliste deux colonnes'
  },
  {
    id: 'chikorita',
    name: 'Chikorita',
    component: TemplateChikorita,
    preview: '/templates/chikorita.png',
    description: 'Sidebar colorée moderne'
  },
  {
    id: 'photo-header',
    name: 'Photo Header',
    component: TemplatePhotoHeader,
    preview: '/templates/photo-header.png',
    description: 'Photo dans le header à gauche'
  },
  {
    id: 'photo-sidebar',
    name: 'Photo Sidebar',
    component: TemplatePhotoSidebar,
    preview: '/templates/photo-sidebar.png',
    description: 'Photo circulaire dans la sidebar'
  },
  {
    id: 'photo-centered',
    name: 'Photo Centrée',
    component: TemplatePhotoCentered,
    preview: '/templates/photo-centered.png',
    description: 'Photo centrée avec gradient'
  },
  {
    id: 'photo-large',
    name: 'Photo Large',
    component: TemplatePhotoLarge,
    preview: '/templates/photo-large.png',
    description: 'Photo en grand format en header'
  },
  {
    id: 'photo-corner',
    name: 'Photo Coin',
    component: TemplatePhotoCorner,
    preview: '/templates/photo-corner.png',
    description: 'Photo dans le coin supérieur droit'
  }
];

export const getTemplateComponent = (templateId: string) => {
  const template = templateConfig.find(t => t.id === templateId);
  return template?.component || templateConfig[0].component;
};

