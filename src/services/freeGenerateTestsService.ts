import axios from "axios";
import dotenv from "dotenv";
import { generateMockUnitTests } from "../utils/mockOpenAI";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export const freeGenerateUnitTests = async (
  code: string,
  language: "python" | "java" | "csharp"
): Promise<string> => {
  const prompt = `Generate unit test cases for the following ${language} code:\n\n${code}`;
  if (!OPENAI_API_KEY) {
    throw new Error("OpenAI API key not set");
  }
  try {
    const query = encodeURIComponent(
      `Generate unit tests for this code:\n${code}`
    );
    const url = `https://free-unoficial-gpt4o-mini-api-g70n.onrender.com/chat/?query=${query}`;

    const response = await axios.get(url, {
      headers: { Accept: "application/json" },
    });

    return response.data.response;
  } catch (error: any) {
    const quotaError =
      error?.response?.data?.error?.code === "insufficient_quota" ||
      error?.response?.data?.error?.code === "invalid_api_key";
    if (quotaError) {
      // Return mock response if quota exceeded
      return generateMockUnitTests(code, language);
    }
    return error.response?.data || { error: error.message };
  }
};
