# Backend UT Gen

This backend service generates unit test cases using OpenAI or Google Gemini.

## Endpoints
- POST /openai-unit-test-case-generator
- POST /gemini-unit-test-case-generator
- GET /health

## Module layout
Each provider lives under its own folder with model, service, controller, and router:
- `src/openAIUnitTestCaseGenerator/`
- `src/geminiUnitTestCaseGenerator/`

## Setup
1. Copy `.env.example` to `.env` and add your OpenAI and/or Gemini API keys.
2. Run `npm install`
3. Start with `npm run dev`
4. Run tests with `npm test`
