import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export const generateUnitTests = async (
  code: string,
  language: string
): Promise<string> => {
  
  const prompt = `Generate unit test cases for the following ${language} code:\n\n${code}`;
  if (!OPENAI_API_KEY) {
    throw new Error("OpenAI API key not set");
  }
  try {
    
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "o4-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that writes unit tests.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message?.content ;
  } catch (error: any) {
    return error.response?.data || { error: error.message };
  }
};
