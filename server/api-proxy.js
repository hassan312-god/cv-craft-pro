/**
 * Proxy API pour protéger la clé API OpenRouter
 * 
 * Installation:
 * npm install express cors dotenv
 * 
 * Démarrage:
 * node server/api-proxy.js
 * 
 * Ou avec nodemon:
 * npx nodemon server/api-proxy.js
 */

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Rate limiting simple (optionnel - pour production, utilisez express-rate-limit)
const requestCounts = new Map();
const RATE_LIMIT = 50; // Requêtes par minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

const rateLimit = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return next();
  }
  
  const record = requestCounts.get(ip);
  
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + RATE_LIMIT_WINDOW;
    return next();
  }
  
  if (record.count >= RATE_LIMIT) {
    return res.status(429).json({ 
      error: 'Trop de requêtes. Veuillez réessayer plus tard.' 
    });
  }
  
  record.count++;
  next();
};

// Endpoint proxy pour OpenRouter
app.post('/api/openrouter', rateLimit, async (req, res) => {
  try {
    const { messages, model = 'openai/gpt-4o-mini', temperature = 0.7, max_tokens } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages invalides' });
    }

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    
    if (!OPENROUTER_API_KEY) {
      console.error('❌ OPENROUTER_API_KEY n\'est pas définie dans les variables d\'environnement');
      return res.status(500).json({ error: 'Configuration serveur invalide' });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:5173',
        'X-Title': 'CV Builder Pro'
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erreur OpenRouter:', response.status, errorText);
      return res.status(response.status).json({ 
        error: `Erreur API: ${response.status}` 
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erreur proxy:', error);
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur proxy API démarré sur le port ${PORT}`);
  console.log(`📡 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log(`🔑 API Key configurée: ${process.env.OPENROUTER_API_KEY ? '✅ Oui' : '❌ Non'}`);
});

