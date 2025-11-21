// Utiliser les variables d'environnement pour la clé API
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_API_URL = import.meta.env.VITE_OPENROUTER_API_URL || 'https://openrouter.ai/api/v1/chat/completions';

// Vérifier que la clé API est définie
if (!OPENROUTER_API_KEY) {
  console.warn('⚠️ VITE_OPENROUTER_API_KEY n\'est pas définie. Les fonctionnalités IA ne fonctionneront pas.');
}

export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

/**
 * Génère une description "À propos" basée sur les informations du CV
 */
export const generateAbout = async (cvData: {
  firstName: string;
  lastName: string;
  experiences: Array<{ position: string; company: string; description: string }>;
  education: Array<{ degree: string; school: string }>;
  skills: Array<{ name: string; level: number }>;
}): Promise<string> => {
  const messages: OpenRouterMessage[] = [
    {
      role: 'system',
      content: 'Tu es un expert en rédaction de CV professionnels. Tu rédiges des descriptions concises, professionnelles et impactantes en français, à la PREMIÈRE PERSONNE (je, me, mon, ma, mes).'
    },
    {
      role: 'user',
      content: `Rédige une section "À propos" professionnelle de 3-4 phrases à la PREMIÈRE PERSONNE (utilise "je", "me", "mon", "ma", "mes") pour ${cvData.firstName} ${cvData.lastName}.
      
Expériences: ${cvData.experiences.map(e => `${e.position} chez ${e.company}`).join(', ') || 'Aucune expérience'}
Formation: ${cvData.education.map(e => `${e.degree} à ${e.school}`).join(', ') || 'Aucune formation'}
Compétences principales: ${cvData.skills.slice(0, 5).map(s => s.name).join(', ') || 'Aucune compétence'}

IMPORTANT: La description DOIT être écrite à la première personne (exemple: "Je suis...", "Mon expérience...", "Mes compétences..."). Ne pas utiliser la troisième personne. La description doit être professionnelle, concise et mettre en valeur le profil. Réponds uniquement avec le texte de la description, sans titre ni formatage.`
    }
  ];

  try {
    // Utiliser le proxy backend si disponible, sinon appeler directement (développement uniquement)
    const API_URL = import.meta.env.VITE_API_URL || OPENROUTER_API_URL;
    const useProxy = import.meta.env.VITE_API_URL;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    // Sur Vercel, utiliser /api/openrouter
    const isVercel = window.location.hostname.includes('vercel.app') || window.location.hostname.includes('vercel.com');
    const endpoint = useProxy 
      ? `${API_URL}/openrouter` 
      : isVercel 
        ? '/api/openrouter'
        : API_URL;
    
    // Si on utilise le proxy ou Vercel, pas besoin de la clé API côté client
    if (!useProxy && !isVercel) {
      if (!OPENROUTER_API_KEY) {
        throw new Error('Clé API non configurée. Veuillez définir VITE_OPENROUTER_API_KEY ou utiliser le proxy backend.');
      }
      headers['Authorization'] = `Bearer ${OPENROUTER_API_KEY}`;
      headers['HTTP-Referer'] = window.location.origin;
      headers['X-Title'] = 'CV Builder Pro';
    }
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 200
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data: OpenRouterResponse = await response.json();
    return data.choices[0]?.message?.content?.trim() || '';
  } catch (error) {
    console.error('Error generating about:', error);
    throw error;
  }
};

/**
 * Génère une description pour une expérience professionnelle
 */
export const generateExperienceDescription = async (
  position: string,
  company: string,
  existingDescription?: string
): Promise<string> => {
  const messages: OpenRouterMessage[] = [
    {
      role: 'system',
      content: 'Tu es un expert en rédaction de CV professionnels. Tu rédiges des descriptions d\'expériences professionnelles concises et impactantes en français, avec des puces.'
    },
    {
      role: 'user',
      content: `Rédige une description professionnelle pour le poste de ${position} chez ${company}.
      
${existingDescription ? `Description actuelle: ${existingDescription}\nAméliore et complète cette description.` : 'Crée une nouvelle description.'}

Format: 3-4 puces décrivant les responsabilités et réalisations principales. Réponds uniquement avec les puces, une par ligne, sans numérotation.`
    }
  ];

  try {
    const API_URL = import.meta.env.VITE_API_URL || OPENROUTER_API_URL;
    const useProxy = import.meta.env.VITE_API_URL;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (!useProxy) {
      if (!OPENROUTER_API_KEY) {
        throw new Error('Clé API non configurée. Veuillez définir VITE_OPENROUTER_API_KEY ou utiliser le proxy backend.');
      }
      headers['Authorization'] = `Bearer ${OPENROUTER_API_KEY}`;
      headers['HTTP-Referer'] = window.location.origin;
      headers['X-Title'] = 'CV Builder Pro';
    }
    
    const isVercel = window.location.hostname.includes('vercel.app') || window.location.hostname.includes('vercel.com');
    const endpoint = useProxy 
      ? `${API_URL}/openrouter` 
      : isVercel 
        ? '/api/openrouter'
        : API_URL;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 250
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data: OpenRouterResponse = await response.json();
    return data.choices[0]?.message?.content?.trim() || '';
  } catch (error) {
    console.error('Error generating experience description:', error);
    throw error;
  }
};

/**
 * Génère une description pour une formation (exactement 5 mots)
 */
export const generateEducationDescription = async (
  degree: string,
  school: string
): Promise<string> => {
  const messages: OpenRouterMessage[] = [
    {
      role: 'system',
      content: 'Tu es un expert en rédaction de CV professionnels. Tu génères des descriptions de formations très courtes et professionnelles en français, exactement 5 mots.'
    },
    {
      role: 'user',
      content: `Génère une description de EXACTEMENT 5 MOTS pour la formation ${degree} à ${school}. 
      
La description doit mettre en valeur les compétences acquises ou la pertinence de la formation. Réponds UNIQUEMENT avec exactement 5 mots, sans ponctuation finale, sans formatage, sans phrases complètes.`
    }
  ];

  try {
    const API_URL = import.meta.env.VITE_API_URL || OPENROUTER_API_URL;
    const useProxy = import.meta.env.VITE_API_URL;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (!useProxy) {
      if (!OPENROUTER_API_KEY) {
        throw new Error('Clé API non configurée. Veuillez définir VITE_OPENROUTER_API_KEY ou utiliser le proxy backend.');
      }
      headers['Authorization'] = `Bearer ${OPENROUTER_API_KEY}`;
      headers['HTTP-Referer'] = window.location.origin;
      headers['X-Title'] = 'CV Builder Pro';
    }
    
    const isVercel = window.location.hostname.includes('vercel.app') || window.location.hostname.includes('vercel.com');
    const endpoint = useProxy 
      ? `${API_URL}/openrouter` 
      : isVercel 
        ? '/api/openrouter'
        : API_URL;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 20
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data: OpenRouterResponse = await response.json();
    let description = data.choices[0]?.message?.content?.trim() || '';
    
    // S'assurer qu'on a exactement 5 mots
    const words = description.split(/\s+/).filter(w => w.length > 0);
    if (words.length > 5) {
      description = words.slice(0, 5).join(' ');
    } else if (words.length < 5 && words.length > 0) {
      // Si moins de 5 mots, on garde ce qui a été généré
      description = words.join(' ');
    }
    
    return description;
  } catch (error) {
    console.error('Error generating education description:', error);
    throw error;
  }
};

