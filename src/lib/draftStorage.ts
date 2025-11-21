import { CVData } from "@/pages/CVCreate";

export interface Draft {
  id: string;
  name: string;
  data: CVData;
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = 'cv-drafts';
const MAX_DRAFTS = 10; // Limite de brouillons

/**
 * Récupère tous les brouillons sauvegardés
 */
export const getAllDrafts = (): Draft[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const drafts: Draft[] = JSON.parse(stored);
    // Trier par date de mise à jour (plus récent en premier)
    return drafts.sort((a, b) => b.updatedAt - a.updatedAt);
  } catch (error) {
    console.error('Erreur lors de la récupération des brouillons:', error);
    return [];
  }
};

/**
 * Sauvegarde un nouveau brouillon ou met à jour un existant
 */
export const saveDraft = (data: CVData, draftId?: string): string => {
  try {
    const drafts = getAllDrafts();
    const now = Date.now();
    
    // Générer un nom automatique basé sur les données
    const name = generateDraftName(data);
    
    if (draftId) {
      // Mettre à jour un brouillon existant
      const index = drafts.findIndex(d => d.id === draftId);
      if (index !== -1) {
        drafts[index] = {
          ...drafts[index],
          data,
          name,
          updatedAt: now
        };
      } else {
        // Si l'ID n'existe pas, créer un nouveau brouillon
        const newDraft: Draft = {
          id: draftId,
          name,
          data,
          createdAt: now,
          updatedAt: now
        };
        drafts.unshift(newDraft);
      }
    } else {
      // Créer un nouveau brouillon
      const newDraft: Draft = {
        id: `draft-${now}`,
        name,
        data,
        createdAt: now,
        updatedAt: now
      };
      drafts.unshift(newDraft);
    }
    
    // Limiter le nombre de brouillons
    const limitedDrafts = drafts.slice(0, MAX_DRAFTS);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedDrafts));
    return draftId || `draft-${now}`;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du brouillon:', error);
    throw error;
  }
};

/**
 * Récupère un brouillon par son ID
 */
export const getDraft = (id: string): Draft | null => {
  try {
    const drafts = getAllDrafts();
    return drafts.find(d => d.id === id) || null;
  } catch (error) {
    console.error('Erreur lors de la récupération du brouillon:', error);
    return null;
  }
};

/**
 * Supprime un brouillon
 */
export const deleteDraft = (id: string): boolean => {
  try {
    const drafts = getAllDrafts();
    const filtered = drafts.filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression du brouillon:', error);
    return false;
  }
};

/**
 * Supprime tous les brouillons
 */
export const clearAllDrafts = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Erreur lors de la suppression de tous les brouillons:', error);
  }
};

/**
 * Génère un nom automatique pour le brouillon basé sur les données
 */
const generateDraftName = (data: CVData): string => {
  if (data.firstName || data.lastName) {
    const name = `${data.firstName} ${data.lastName}`.trim();
    if (name) return name;
  }
  
  if (data.experiences.length > 0 && data.experiences[0].position) {
    return data.experiences[0].position;
  }
  
  if (data.email) {
    return data.email;
  }
  
  return `Brouillon ${new Date().toLocaleDateString('fr-FR')}`;
};

/**
 * Formate la date pour l'affichage
 */
export const formatDraftDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours === 0) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
  } else if (days === 1) {
    return 'Hier';
  } else if (days < 7) {
    return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
  } else {
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }
};

