@echo off
REM Script de test pour le webhook (Windows)
REM Usage: scripts\test-webhook.bat [URL]

set WEBHOOK_URL=%~1
if "%WEBHOOK_URL%"=="" set WEBHOOK_URL=https://cv-craft-pro.vercel.app/api/webhook

set TEST_URL=%WEBHOOK_URL:-webhook=/webhook-test%

echo 🧪 Testing Webhook Endpoint
echo ================================
echo.

REM Test 1: Vérifier que l'endpoint de test fonctionne
echo 1️⃣ Testing webhook-test endpoint...
curl -X GET "%TEST_URL%" -H "Content-Type: application/json" -s
echo.
echo.

REM Test 2: Simuler un événement push
echo 2️⃣ Testing push event...
curl -X POST "%WEBHOOK_URL%" ^
  -H "Content-Type: application/json" ^
  -H "X-GitHub-Event: push" ^
  -d "{\"ref\":\"refs/heads/main\",\"repository\":{\"name\":\"cv-craft-pro\",\"full_name\":\"test/cv-craft-pro\",\"html_url\":\"https://github.com/test/cv-craft-pro\"},\"commits\":[{\"id\":\"abc123\",\"message\":\"Test commit\",\"author\":{\"name\":\"Test User\",\"email\":\"test@example.com\"}}],\"sender\":{\"login\":\"testuser\"}}" ^
  -s
echo.
echo.

REM Test 3: Simuler un événement pull_request
echo 3️⃣ Testing pull_request event...
curl -X POST "%WEBHOOK_URL%" ^
  -H "Content-Type: application/json" ^
  -H "X-GitHub-Event: pull_request" ^
  -d "{\"action\":\"opened\",\"pull_request\":{\"number\":1,\"title\":\"Test PR\",\"state\":\"open\",\"user\":{\"login\":\"testuser\"}},\"repository\":{\"name\":\"cv-craft-pro\",\"full_name\":\"test/cv-craft-pro\"}}" ^
  -s
echo.
echo.

echo ✅ Tests completed!
echo.
echo 💡 Production URL: https://cv-craft-pro.vercel.app/api/webhook
echo 💡 To test locally, use: scripts\test-webhook.bat http://localhost:3000/api/webhook

