import { TemplateDarkSidebar } from "@/components/templates/TemplateDarkSidebar";
import { TemplateAzurill } from "@/components/templates/TemplateAzurill";
import { TemplateBronzor } from "@/components/templates/TemplateBronzor";
import { TemplateChikorita } from "@/components/templates/TemplateChikorita";
import { TemplateCorporate } from "@/components/templates/TemplateCorporate";
import { TemplateGradient } from "@/components/templates/TemplateGradient";
import { TemplateCompact } from "@/components/templates/TemplateCompact";
import { TemplatePhotoBanner } from "@/components/templates/TemplatePhotoBanner";

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
  {
    id: 'minimal',
    name: 'Minimal',
    component: TemplateMinimal,
    preview: '/templates/minimal.png',
    description: 'Design épuré et minimaliste',
    category: 'minimalist'
  },
  {
    id: 'executive',
    name: 'Executive',
    component: TemplateExecutive,
    preview: '/templates/executive.png',
    description: 'Style professionnel pour cadres',
    category: 'professional'
  },
  {
    id: 'creative',
    name: 'Créatif',
    component: TemplateCreative,
    preview: '/templates/creative.png',
    description: 'Design créatif et coloré',
    category: 'creative'
  },
  {
    id: 'modern',
    name: 'Moderne',
    component: TemplateModernNew,
    preview: '/templates/modern.png',
    description: 'Mise en page contemporaine',
    category: 'modern'
  },
  {
    id: 'professional',
    name: 'Professionnel',
    component: TemplateProfessional,
    preview: '/templates/professional.png',
    description: 'Style corporate classique',
    category: 'professional'
  },
  {
    id: 'elegant',
    name: 'Élégant',
    component: TemplateElegant,
    preview: '/templates/elegant.png',
    description: 'Design raffiné et élégant',
    category: 'professional'
  },
  {
    id: 'tech',
    name: 'Tech',
    component: TemplateTech,
    preview: '/templates/tech.png',
    description: 'Parfait pour les développeurs',
    category: 'modern'
  },
  {
    id: 'classic',
    name: 'Classique',
    component: TemplateClassic,
    preview: '/templates/classic.png',
    description: 'Mise en page traditionnelle',
    category: 'classic'
  },
  {
    id: 'bold',
    name: 'Bold',
    component: TemplateBold,
    preview: '/templates/bold.png',
    description: 'Design audacieux et impactant',
    category: 'creative'
  },
  {
    id: 'clean',
    name: 'Clean',
    component: TemplateClean,
    preview: '/templates/clean.png',
    description: 'Interface claire et lisible',
    category: 'minimalist'
  },
  {
    id: 'dark-sidebar',
    name: 'Sidebar Sombre',
    component: TemplateDarkSidebar,
    preview: '/templates/dark-sidebar.png',
    description: 'Sidebar gris foncé professionnel',
    category: 'professional'
  },
  {
    id: 'azurill',
    name: 'Azurill',
    component: TemplateAzurill,
    preview: '/templates/azurill.png',
    description: 'Header centré avec photo',
    category: 'with-photo'
  },
  {
    id: 'bronzor',
    name: 'Bronzor',
    component: TemplateBronzor,
    preview: '/templates/bronzor.png',
    description: 'Minimaliste deux colonnes',
    category: 'minimalist'
  },
  {
    id: 'chikorita',
    name: 'Chikorita',
    component: TemplateChikorita,
    preview: '/templates/chikorita.png',
    description: 'Sidebar colorée moderne',
    category: 'with-photo'
  },
  {
    id: 'photo-header',
    name: 'Photo Header',
    component: TemplatePhotoHeader,
    preview: '/templates/photo-header.png',
    description: 'Photo dans le header à gauche',
    category: 'with-photo'
  },
  {
    id: 'photo-sidebar',
    name: 'Photo Sidebar',
    component: TemplatePhotoSidebar,
    preview: '/templates/photo-sidebar.png',
    description: 'Photo circulaire dans la sidebar',
    category: 'with-photo'
  },
  {
    id: 'photo-centered',
    name: 'Photo Centrée',
    component: TemplatePhotoCentered,
    preview: '/templates/photo-centered.png',
    description: 'Photo centrée avec gradient',
    category: 'with-photo'
  },
  {
    id: 'photo-large',
    name: 'Photo Large',
    component: TemplatePhotoLarge,
    preview: '/templates/photo-large.png',
    description: 'Photo en grand format en header',
    category: 'with-photo'
  },
  {
    id: 'photo-corner',
    name: 'Photo Coin',
    component: TemplatePhotoCorner,
    preview: '/templates/photo-corner.png',
    description: 'Photo dans le coin supérieur droit',
    category: 'with-photo'
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    component: TemplateSidebar,
    preview: '/templates/sidebar.png',
    description: 'Layout avec sidebar professionnel',
    category: 'professional'
  },
  {
    id: 'two-column',
    name: 'Deux Colonnes',
    component: TemplateTwoColumn,
    preview: '/templates/two-column.png',
    description: 'Mise en page deux colonnes équilibrée',
    category: 'modern'
  },
  {
    id: 'timeline',
    name: 'Timeline',
    component: TemplateTimeline,
    preview: '/templates/timeline.png',
    description: 'Design chronologique avec timeline',
    category: 'modern'
  },
  {
    id: 'photo-modern',
    name: 'Photo Moderne',
    component: TemplatePhotoModern,
    preview: '/templates/photo-modern.png',
    description: 'Header moderne avec photo circulaire',
    category: 'with-photo'
  },
  {
    id: 'photo-compact',
    name: 'Photo Compact',
    component: TemplatePhotoCompact,
    preview: '/templates/photo-compact.png',
    description: 'Layout compact avec photo carrée',
    category: 'with-photo'
  },
  {
    id: 'corporate',
    name: 'Corporate',
    component: TemplateCorporate,
    preview: '/templates/corporate.png',
    description: 'Style corporate avec barre colorée',
    category: 'professional'
  },
  {
    id: 'gradient',
    name: 'Gradient',
    component: TemplateGradient,
    preview: '/templates/gradient.png',
    description: 'Header avec dégradé moderne',
    category: 'modern'
  },
  {
    id: 'compact',
    name: 'Compact',
    component: TemplateCompact,
    preview: '/templates/compact.png',
    description: 'Layout compact deux colonnes',
    category: 'minimalist'
  },
  {
    id: 'photo-banner',
    name: 'Photo Banner',
    component: TemplatePhotoBanner,
    preview: '/templates/photo-banner.png',
    description: 'Banner avec photo et gradient',
    category: 'with-photo'
  }
];

export const getTemplateComponent = (templateId: string) => {
  const template = templateConfig.find(t => t.id === templateId);
  return template?.component || templateConfig[0].component;
};

