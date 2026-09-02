import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const DEFAULT_MODEL = Deno.env.get('OPENROUTER_MODEL') ?? 'qwen/qwen-2.5-72b-instruct'
const ALLOWED_MODELS = new Set([
  'qwen/qwen-2.5-72b-instruct',
  'deepseek/deepseek-chat-v3-0324',
  'meta-llama/llama-3.1-8b-instruct',
  'google/gemini-2.0-flash-001',
  'openai/gpt-4o-mini',
])

type Message = { role: 'system' | 'user' | 'assistant'; content: string }

function resolveModel(model?: string): string {
  if (typeof model === 'string' && model.trim() && ALLOWED_MODELS.has(model.trim())) {
    return model.trim()
  }
  return DEFAULT_MODEL
}

async function callOpenRouter(
  apiKey: string,
  messages: Message[],
  maxTokens: number,
  json = false,
  selectedModel?: string,
): Promise<string> {
  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: resolveModel(selectedModel),
      messages,
      temperature: 0.7,
      max_tokens: maxTokens,
      ...(json ? { response_format: { type: 'json_object' } } : {}),
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    console.error(`OpenRouter error [${res.status}]: ${body}`)
    throw new Error(`[${res.status}] ${body}`)
  }

  const data = await res.json()
  return String(data?.choices?.[0]?.message?.content ?? '').trim()
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get('OPENROUTER_API_KEY')
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'OPENROUTER_API_KEY manquant' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const body = await req.json().catch(() => null)
    const action = body?.action
    const payload = body?.payload ?? {}
    const selectedModel = typeof payload.model === 'string' ? payload.model : undefined

    if (typeof action !== 'string') {
      return new Response(JSON.stringify({ error: 'action requise' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const sys: Message = {
      role: 'system',
      content:
        "Tu es un expert en rédaction de CV professionnels en français. Tu écris de façon concise, professionnelle et sans emoji.",
    }

    let result: unknown

    if (action === 'about') {
      const text = await callOpenRouter(apiKey, [
        sys,
        {
          role: 'user',
          content: `Rédige une section "À propos" de 3 à 4 phrases à la PREMIÈRE PERSONNE pour ${payload.firstName ?? ''} ${payload.lastName ?? ''}.
Expériences: ${(payload.experiences ?? []).map((e: any) => `${e.position} chez ${e.company}`).join(', ') || 'aucune'}
Formation: ${(payload.education ?? []).map((e: any) => `${e.degree} à ${e.school}`).join(', ') || 'aucune'}
Compétences: ${(payload.skills ?? []).slice(0, 6).map((s: any) => s.name).join(', ') || 'aucune'}
Réponds uniquement avec le texte, sans titre ni formatage.`,
        },
      ], 300, false, selectedModel)
      result = { text }
    } else if (action === 'experience') {
      const text = await callOpenRouter(apiKey, [
        sys,
        {
          role: 'user',
          content: `Rédige 3 à 4 puces décrivant les responsabilités et réalisations pour le poste de ${payload.position} chez ${payload.company}.${payload.existingDescription ? `\nDescription actuelle à améliorer: ${payload.existingDescription}` : ''}
Réponds uniquement avec les puces, une par ligne, sans numérotation.`,
        },
      ], 300, false, selectedModel)
      result = { text }
    } else if (action === 'education') {
      const text = await callOpenRouter(apiKey, [
        sys,
        {
          role: 'user',
          content: `Génère une description de EXACTEMENT 5 MOTS pour la formation ${payload.degree} à ${payload.school}. Réponds uniquement avec ces 5 mots, sans ponctuation finale.`,
        },
      ], 40, false, selectedModel)
      result = { text }
    } else if (action === 'step') {
      const step = payload.step
      const context = `Profil: ${payload.firstName ?? ''} ${payload.lastName ?? ''}. Métier / secteur visé: ${payload.jobTitle || 'profil professionnel polyvalent'}.`
      const schemas: Record<string, string> = {
        personal:
          '{"firstName":string,"lastName":string,"email":string,"phone":string,"address":string,"about":string}',
        experiences:
          '{"experiences":[{"position":string,"company":string,"startDate":"MM/AAAA","endDate":"MM/AAAA ou Présent","description":string}]} (3 entrées)',
        education:
          '{"education":[{"degree":string,"school":string,"startDate":"AAAA","endDate":"AAAA","description":string}]} (2 entrées)',
        skills:
          '{"skills":[{"name":string,"level":number entre 60 et 95}]} (8 entrées)',
        socials:
          '{"linkedin":string,"github":string,"twitter":string,"portfolio":string} (URLs plausibles)',
      }
      const schema = schemas[step]
      if (!schema) {
        return new Response(JSON.stringify({ error: 'step inconnu' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      const raw = await callOpenRouter(
        apiKey,
        [
          sys,
          {
            role: 'user',
            content: `${context}
Génère un exemple réaliste de contenu de CV en français au format JSON strict correspondant à ce schéma: ${schema}.
Réponds uniquement avec le JSON, sans texte autour.`,
          },
        ],
        1200,
        true,
        selectedModel,
      )
      try {
        result = JSON.parse(raw.replace(/^```(json)?/i, '').replace(/```$/, '').trim())
      } catch {
        throw new Error('Réponse IA invalide')
      }
    } else {
      return new Response(JSON.stringify({ error: 'action inconnue' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('ai-cv failed:', error)
    return new Response(JSON.stringify({ error: String((error as Error).message ?? error) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
