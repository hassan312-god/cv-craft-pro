import { CVData } from "@/pages/CVCreate";

export interface SharedCV {
  id: string;
  cvData: CVData;
  createdAt: number;
  expiresAt: number;
  viewCount: number;
}

const STORAGE_KEY = 'shared-cvs';
const EXPIRY_DAYS = 30; // Les CVs partagés expirent après 30 jours

/**
 * Génère un ID unique pour le partage
 */
const generateShareId = (): string => {
  return `cv-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Sauvegarde un CV partagé
 */
export const saveSharedCV = (cvData: CVData): string => {
  try {
    const sharedCVs = getAllSharedCVs();
    const id = generateShareId();
    const now = Date.now();
    
    const sharedCV: SharedCV = {
      id,
      cvData,
      createdAt: now,
      expiresAt: now + (EXPIRY_DAYS * 24 * 60 * 60 * 1000),
      viewCount: 0
    };
    
    sharedCVs.push(sharedCV);
    
    // Nettoyer les CVs expirés
    const activeCVs = sharedCVs.filter(cv => cv.expiresAt > now);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activeCVs));
    return id;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du CV partagé:', error);
    throw error;
  }
};

/**
 * Récupère un CV partagé par son ID
 */
export const getSharedCV = (id: string): SharedCV | null => {
  try {
    const sharedCVs = getAllSharedCVs();
    const sharedCV = sharedCVs.find(cv => cv.id === id);
    
    if (!sharedCV) {
      return null;
    }
    
    // Vérifier l'expiration
    if (sharedCV.expiresAt < Date.now()) {
      deleteSharedCV(id);
      return null;
    }
    
    // Incrémenter le compteur de vues
    sharedCV.viewCount++;
    updateSharedCV(sharedCV);
    
    return sharedCV;
  } catch (error) {
    console.error('Erreur lors de la récupération du CV partagé:', error);
    return null;
  }
};

/**
 * Récupère tous les CVs partagés
 */
export const getAllSharedCVs = (): SharedCV[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const sharedCVs: SharedCV[] = JSON.parse(stored);
    const now = Date.now();
    
    // Filtrer les CVs expirés
    const activeCVs = sharedCVs.filter(cv => cv.expiresAt > now);
    
    // Mettre à jour le storage si des CVs ont été supprimés
    if (activeCVs.length !== sharedCVs.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activeCVs));
    }
    
    return activeCVs;
  } catch (error) {
    console.error('Erreur lors de la récupération des CVs partagés:', error);
    return [];
  }
};

/**
 * Met à jour un CV partagé
 */
const updateSharedCV = (sharedCV: SharedCV): void => {
  try {
    const sharedCVs = getAllSharedCVs();
    const index = sharedCVs.findIndex(cv => cv.id === sharedCV.id);
    
    if (index !== -1) {
      sharedCVs[index] = sharedCV;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sharedCVs));
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du CV partagé:', error);
  }
};

/**
 * Supprime un CV partagé
 */
export const deleteSharedCV = (id: string): boolean => {
  try {
    const sharedCVs = getAllSharedCVs();
    const filtered = sharedCVs.filter(cv => cv.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression du CV partagé:', error);
    return false;
  }
};

/**
 * Génère l'URL de partage
 */
export const getShareUrl = (shareId: string): string => {
  return `${window.location.origin}/share/${shareId}`;
};

/**
 * Formate la date d'expiration
 */
export const formatExpiryDate = (expiresAt: number): string => {
  const date = new Date(expiresAt);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

