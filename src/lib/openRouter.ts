const OPENROUTER_API_KEY = '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';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

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
      content: 'Tu es un expert en rédaction de CV professionnels. Tu rédiges des descriptions concises, professionnelles et impactantes en français.'
    },
    {
      role: 'user',
      content: `Rédige une section "À propos" professionnelle de 3-4 phrases pour ${cvData.firstName} ${cvData.lastName}.
      
Expériences: ${cvData.experiences.map(e => `${e.position} chez ${e.company}`).join(', ') || 'Aucune expérience'}
Formation: ${cvData.education.map(e => `${e.degree} à ${e.school}`).join(', ') || 'Aucune formation'}
Compétences principales: ${cvData.skills.slice(0, 5).map(s => s.name).join(', ') || 'Aucune compétence'}

La description doit être professionnelle, concise et mettre en valeur le profil. Réponds uniquement avec le texte de la description, sans titre ni formatage.`
    }
  ];

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'CV Builder Pro'
      },
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
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'CV Builder Pro'
      },
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
 * Génère une description pour une formation
 */
export const generateEducationDescription = async (
  degree: string,
  school: string
): Promise<string> => {
  const messages: OpenRouterMessage[] = [
    {
      role: 'system',
      content: 'Tu es un expert en rédaction de CV professionnels. Tu rédiges des descriptions de formations concises et professionnelles en français.'
    },
    {
      role: 'user',
      content: `Rédige une brève description (2-3 phrases) pour la formation ${degree} à ${school}. 
      
La description doit mettre en valeur les compétences acquises et la pertinence de la formation. Réponds uniquement avec le texte, sans formatage.`
    }
  ];

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'CV Builder Pro'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data: OpenRouterResponse = await response.json();
    return data.choices[0]?.message?.content?.trim() || '';
  } catch (error) {
    console.error('Error generating education description:', error);
    throw error;
  }
};

