export interface Rating {
  templateId: string;
  rating: number; // 1-5
  timestamp: number;
}

const STORAGE_KEY = 'cv-template-ratings';

/**
 * Récupère toutes les notes pour un modèle
 */
export const getRatingsForTemplate = (templateId: string): Rating[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const allRatings: Rating[] = JSON.parse(stored);
    return allRatings.filter(r => r.templateId === templateId);
  } catch (error) {
    console.error('Erreur lors de la récupération des notes:', error);
    return [];
  }
};

/**
 * Ajoute une note pour un modèle
 */
export const addRating = (templateId: string, rating: number): boolean => {
  try {
    if (rating < 1 || rating > 5) {
      throw new Error('La note doit être entre 1 et 5');
    }
    
    const stored = localStorage.getItem(STORAGE_KEY);
    const allRatings: Rating[] = stored ? JSON.parse(stored) : [];
    
    const newRating: Rating = {
      templateId,
      rating,
      timestamp: Date.now()
    };
    
    allRatings.push(newRating);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allRatings));
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la note:', error);
    return false;
  }
};

/**
 * Calcule la note moyenne d'un modèle
 */
export const getAverageRating = (templateId: string): { average: number; count: number } => {
  const ratings = getRatingsForTemplate(templateId);
  
  if (ratings.length === 0) {
    return { average: 0, count: 0 };
  }
  
  const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
  const average = sum / ratings.length;
  
  return {
    average: Math.round(average * 10) / 10, // Arrondir à 1 décimale
    count: ratings.length
  };
};

/**
 * Récupère toutes les notes moyennes pour tous les modèles
 */
export const getAllAverageRatings = (): Record<string, { average: number; count: number }> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return {};
    
    const allRatings: Rating[] = JSON.parse(stored);
    const templateIds = [...new Set(allRatings.map(r => r.templateId))];
    
    const result: Record<string, { average: number; count: number }> = {};
    
    templateIds.forEach(templateId => {
      result[templateId] = getAverageRating(templateId);
    });
    
    return result;
  } catch (error) {
    console.error('Erreur lors de la récupération des notes moyennes:', error);
    return {};
  }
};

/**
 * Vérifie si l'utilisateur a déjà noté un modèle (basé sur le localStorage)
 * Note: Dans une vraie app, on utiliserait un ID utilisateur unique
 */
export const hasUserRated = (templateId: string): boolean => {
  // Pour simplifier, on vérifie juste s'il y a des notes récentes
  // Dans une vraie app, on utiliserait un système d'authentification
  const ratings = getRatingsForTemplate(templateId);
  // Si l'utilisateur a noté dans les dernières 24h, on considère qu'il a déjà noté
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
  return ratings.some(r => r.timestamp > oneDayAgo);
};

/**
 * Supprime toutes les notes (utile pour le développement)
 */
export const clearAllRatings = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Erreur lors de la suppression des notes:', error);
  }
};

