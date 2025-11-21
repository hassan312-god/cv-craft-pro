// Configuration centralisée des thèmes avec couleurs et polices

export interface ThemeConfig {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    text: string;
    light: string;
    accent: string;
    sidebar?: string;
    sidebarText?: string;
    bg?: string;
    bgText?: string;
  };
  fontFamily: string;
  previewColor: string;
}

export const themeConfigs: Record<string, ThemeConfig> = {
  'minimalist-black': {
    id: 'minimalist-black',
    name: 'Minimaliste Noir',
    colors: {
      primary: 'rgb(23, 23, 23)',
      secondary: 'rgb(100, 100, 100)',
      text: 'rgb(50, 50, 50)',
      light: 'rgb(240, 240, 240)',
      accent: 'rgb(23, 23, 23)',
    },
    fontFamily: 'system-ui, -apple-system, sans-serif',
    previewColor: 'bg-black',
  },
  'elegant-dark': {
    id: 'elegant-dark',
    name: 'Élégant Sombre',
    colors: {
      primary: 'rgb(30, 41, 59)',
      secondary: 'rgb(100, 116, 139)',
      text: 'rgb(51, 65, 85)',
      light: 'rgb(248, 250, 252)',
      accent: 'rgb(100, 116, 139)',
    },
    fontFamily: 'Georgia, "Times New Roman", serif',
    previewColor: 'bg-slate-800',
  },
  'professional-blue': {
    id: 'professional-blue',
    name: 'Professionnel Bleu',
    colors: {
      primary: 'rgb(37, 99, 235)',
      secondary: 'rgb(59, 130, 246)',
      text: 'rgb(30, 41, 59)',
      light: 'rgb(241, 245, 249)',
      accent: 'rgb(37, 99, 235)',
    },
    fontFamily: 'system-ui, -apple-system, sans-serif',
    previewColor: 'bg-blue-600',
  },
  'modern-gray': {
    id: 'modern-gray',
    name: 'Moderne Gris',
    colors: {
      primary: 'rgb(75, 85, 99)',
      secondary: 'rgb(107, 114, 128)',
      text: 'rgb(31, 41, 55)',
      light: 'rgb(249, 250, 251)',
      accent: 'rgb(75, 85, 99)',
    },
    fontFamily: 'system-ui, -apple-system, sans-serif',
    previewColor: 'bg-gray-600',
  },
  'creative-gradient': {
    id: 'creative-gradient',
    name: 'Créatif Gradient',
    colors: {
      primary: 'rgb(168, 85, 247)',
      secondary: 'rgb(236, 72, 153)',
      text: 'rgb(30, 41, 59)',
      light: 'rgb(250, 245, 255)',
      accent: 'rgb(168, 85, 247)',
    },
    fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
    previewColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
  },
  'ocean-blue': {
    id: 'ocean-blue',
    name: 'Bleu Océan',
    colors: {
      primary: 'rgb(14, 165, 233)',
      secondary: 'rgb(6, 182, 212)',
      text: 'rgb(30, 41, 59)',
      light: 'rgb(224, 242, 254)',
      accent: 'rgb(14, 165, 233)',
    },
    fontFamily: 'system-ui, -apple-system, sans-serif',
    previewColor: 'bg-gradient-to-r from-blue-400 to-cyan-500',
  },
  'forest-green': {
    id: 'forest-green',
    name: 'Vert Forêt',
    colors: {
      primary: 'rgb(22, 163, 74)',
      secondary: 'rgb(16, 185, 129)',
      text: 'rgb(30, 41, 59)',
      light: 'rgb(220, 252, 231)',
      accent: 'rgb(22, 163, 74)',
    },
    fontFamily: 'system-ui, -apple-system, sans-serif',
    previewColor: 'bg-gradient-to-r from-green-600 to-emerald-600',
  },
  'sunset-orange': {
    id: 'sunset-orange',
    name: 'Orange Coucher',
    colors: {
      primary: 'rgb(249, 115, 22)',
      secondary: 'rgb(239, 68, 68)',
      text: 'rgb(30, 41, 59)',
      light: 'rgb(255, 237, 213)',
      accent: 'rgb(249, 115, 22)',
    },
    fontFamily: 'system-ui, -apple-system, sans-serif',
    previewColor: 'bg-gradient-to-r from-orange-500 to-red-500',
  },
  'royal-purple': {
    id: 'royal-purple',
    name: 'Violet Royal',
    colors: {
      primary: 'rgb(147, 51, 234)',
      secondary: 'rgb(99, 102, 241)',
      text: 'rgb(30, 41, 59)',
      light: 'rgb(243, 232, 255)',
      accent: 'rgb(147, 51, 234)',
    },
    fontFamily: 'Georgia, "Times New Roman", serif',
    previewColor: 'bg-gradient-to-r from-purple-600 to-indigo-600',
  },
  'coral-pink': {
    id: 'coral-pink',
    name: 'Rose Corail',
    colors: {
      primary: 'rgb(244, 63, 94)',
      secondary: 'rgb(251, 113, 133)',
      text: 'rgb(30, 41, 59)',
      light: 'rgb(255, 228, 230)',
      accent: 'rgb(244, 63, 94)',
    },
    fontFamily: 'system-ui, -apple-system, sans-serif',
    previewColor: 'bg-gradient-to-r from-pink-400 to-rose-500',
  },
  'midnight-blue': {
    id: 'midnight-blue',
    name: 'Bleu Minuit',
    colors: {
      primary: 'rgb(15, 23, 42)',
      secondary: 'rgb(30, 58, 138)',
      text: 'rgb(248, 250, 252)',
      light: 'rgb(241, 245, 249)',
      accent: 'rgb(59, 130, 246)',
    },
    fontFamily: 'system-ui, -apple-system, sans-serif',
    previewColor: 'bg-gradient-to-r from-slate-900 to-blue-900',
  },
  'emerald-green': {
    id: 'emerald-green',
    name: 'Vert Émeraude',
    colors: {
      primary: 'rgb(16, 185, 129)',
      secondary: 'rgb(5, 150, 105)',
      text: 'rgb(30, 41, 59)',
      light: 'rgb(209, 250, 229)',
      accent: 'rgb(16, 185, 129)',
    },
    fontFamily: 'system-ui, -apple-system, sans-serif',
    previewColor: 'bg-gradient-to-r from-emerald-500 to-teal-500',
  },
};

// Fonction utilitaire pour obtenir les couleurs d'un thème
export const getThemeColors = (themeId: string) => {
  const theme = themeConfigs[themeId] || themeConfigs['minimalist-black'];
  return theme.colors;
};

// Fonction utilitaire pour obtenir la police d'un thème
export const getThemeFont = (themeId: string) => {
  const theme = themeConfigs[themeId] || themeConfigs['minimalist-black'];
  return theme.fontFamily;
};

// Fonction utilitaire pour obtenir la configuration complète d'un thème
export const getThemeConfig = (themeId: string): ThemeConfig => {
  return themeConfigs[themeId] || themeConfigs['minimalist-black'];
};

// Liste de tous les thèmes pour le sélecteur
export const allThemes = Object.values(themeConfigs);

