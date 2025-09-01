import Configuration, { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateUnitTests = async (code: string, language: string): Promise<string> => {
  const prompt = `Generate unit test cases for the following ${language} code:

${code}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful assistant that writes unit tests." },
      { role: "user", content: prompt }
    ]
  });

  return response.choices[0].message?.content || "";
};