import axios from 'axios';

const GENAI_API_KEY = process.env.GENAI_API_KEY;
const GENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export async function generateUnitTests(code: string, language: string): Promise<string> {
  if (!GENAI_API_KEY) {
    throw new Error('Gen AI API key not set');
  }

  const prompt = `Generate unit test cases for the following ${language} code:\n\n${code}`;

  const response = await axios.post(
    GENAI_API_URL,
    {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that writes unit tests.' },
        { role: 'user', content: prompt }
      ]
    },
    {
      headers: {
        'Authorization': `Bearer ${GENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  type OpenAIResponse = {
    choices: {
      message: {
        content: string;
      };
    }[];
  };

  const data = response.data as OpenAIResponse;

  return data.choices[0].message.content;
}
