export interface UsageStats {
  totalCVsCreated: number;
  totalPDFsExported: number;
  totalWordsExported: number;
  totalSharesCreated: number;
  mostUsedTemplate: string;
  mostUsedTheme: string;
  templatesUsed: Record<string, number>;
  themesUsed: Record<string, number>;
  lastActivity: number;
}

const STORAGE_KEY = 'cv-builder-stats';

/**
 * Récupère les statistiques d'utilisation
 */
export const getUsageStats = (): UsageStats => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return getDefaultStats();
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Erreur lors de la récupération des stats:', error);
    return getDefaultStats();
  }
};

/**
 * Retourne les statistiques par défaut
 */
const getDefaultStats = (): UsageStats => {
  return {
    totalCVsCreated: 0,
    totalPDFsExported: 0,
    totalWordsExported: 0,
    totalSharesCreated: 0,
    mostUsedTemplate: '',
    mostUsedTheme: '',
    templatesUsed: {},
    themesUsed: {},
    lastActivity: Date.now()
  };
};

/**
 * Sauvegarde les statistiques
 */
const saveStats = (stats: UsageStats): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des stats:', error);
  }
};

/**
 * Incrémente le compteur de CVs créés
 */
export const incrementCVsCreated = (): void => {
  const stats = getUsageStats();
  stats.totalCVsCreated++;
  stats.lastActivity = Date.now();
  saveStats(stats);
};

/**
 * Incrémente le compteur de PDFs exportés
 */
export const incrementPDFsExported = (): void => {
  const stats = getUsageStats();
  stats.totalPDFsExported++;
  stats.lastActivity = Date.now();
  saveStats(stats);
};

/**
 * Incrémente le compteur de Word exportés
 */
export const incrementWordsExported = (): void => {
  const stats = getUsageStats();
  stats.totalWordsExported++;
  stats.lastActivity = Date.now();
  saveStats(stats);
};

/**
 * Incrémente le compteur de partages créés
 */
export const incrementSharesCreated = (): void => {
  const stats = getUsageStats();
  stats.totalSharesCreated++;
  stats.lastActivity = Date.now();
  saveStats(stats);
};

/**
 * Enregistre l'utilisation d'un template
 */
export const recordTemplateUsage = (templateId: string): void => {
  const stats = getUsageStats();
  
  if (!stats.templatesUsed[templateId]) {
    stats.templatesUsed[templateId] = 0;
  }
  stats.templatesUsed[templateId]++;
  
  // Mettre à jour le template le plus utilisé
  const mostUsed = Object.entries(stats.templatesUsed)
    .sort(([, a], [, b]) => b - a)[0];
  if (mostUsed) {
    stats.mostUsedTemplate = mostUsed[0];
  }
  
  stats.lastActivity = Date.now();
  saveStats(stats);
};

/**
 * Enregistre l'utilisation d'un thème
 */
export const recordThemeUsage = (themeId: string): void => {
  const stats = getUsageStats();
  
  if (!stats.themesUsed[themeId]) {
    stats.themesUsed[themeId] = 0;
  }
  stats.themesUsed[themeId]++;
  
  // Mettre à jour le thème le plus utilisé
  const mostUsed = Object.entries(stats.themesUsed)
    .sort(([, a], [, b]) => b - a)[0];
  if (mostUsed) {
    stats.mostUsedTheme = mostUsed[0];
  }
  
  stats.lastActivity = Date.now();
  saveStats(stats);
};

/**
 * Réinitialise les statistiques
 */
export const resetStats = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Erreur lors de la réinitialisation des stats:', error);
  }
};

