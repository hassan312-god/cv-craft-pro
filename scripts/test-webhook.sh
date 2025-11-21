#!/bin/bash

# Script de test pour le webhook
# Usage: ./scripts/test-webhook.sh [URL]

WEBHOOK_URL="${1:-https://cv-craft-pro.vercel.app/api/webhook}"
TEST_URL="${WEBHOOK_URL%-webhook}/webhook-test"

echo "🧪 Testing Webhook Endpoint"
echo "================================"
echo ""

# Test 1: Vérifier que l'endpoint de test fonctionne
echo "1️⃣ Testing webhook-test endpoint..."
curl -X GET "$TEST_URL" \
  -H "Content-Type: application/json" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s | jq '.' || echo "❌ Failed or jq not installed"
echo ""

# Test 2: Simuler un événement push
echo "2️⃣ Testing push event..."
curl -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -H "X-GitHub-Event: push" \
  -d '{
    "ref": "refs/heads/main",
    "repository": {
      "name": "cv-craft-pro",
      "full_name": "test/cv-craft-pro",
      "html_url": "https://github.com/test/cv-craft-pro"
    },
    "commits": [{
      "id": "abc123",
      "message": "Test commit",
      "author": {
        "name": "Test User",
        "email": "test@example.com"
      }
    }],
    "sender": {
      "login": "testuser"
    }
  }' \
  -w "\nHTTP Status: %{http_code}\n" \
  -s | jq '.' || echo "❌ Failed or jq not installed"
echo ""

# Test 3: Simuler un événement pull_request
echo "3️⃣ Testing pull_request event..."
curl -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -H "X-GitHub-Event: pull_request" \
  -d '{
    "action": "opened",
    "pull_request": {
      "number": 1,
      "title": "Test PR",
      "state": "open",
      "user": {
        "login": "testuser"
      }
    },
    "repository": {
      "name": "cv-craft-pro",
      "full_name": "test/cv-craft-pro"
    }
  }' \
  -w "\nHTTP Status: %{http_code}\n" \
  -s | jq '.' || echo "❌ Failed or jq not installed"
echo ""

echo "✅ Tests completed!"
echo ""
echo "💡 Production URL: https://cv-craft-pro.vercel.app/api/webhook"
echo "💡 To test locally, use: ./scripts/test-webhook.sh http://localhost:3000/api/webhook"

