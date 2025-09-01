# Backend UT Gen

This backend service generates unit test cases using OpenAI's API.

## Endpoints
- POST /generate-tests
- GET /health

## Setup
1. Copy `.env.example` to `.env` and add your OpenAI API key.
2. Run `npm install`
3. Start with `npm run dev`
4. Run tests with `npm test`