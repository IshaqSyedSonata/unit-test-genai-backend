import axios from "axios";
import dotenv from "dotenv";
import { MockOpenAI } from "../utils/mockOpenAI";
import { SupportedLanguage } from "./openAIUnitTestCaseGenerator.model";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
const apiUrl = "https://api.openai.com/v1/chat/completions";
const model = "gpt-4o";

export const generate = async (
  code: string,
  language: SupportedLanguage
): Promise<string> => {
  const prompt = `Generate unit test cases for the following ${language} code:\n\n${code}`;

  if (!apiKey) {
    throw new Error("OpenAI API key not set");
  }

  try {
    const response = await axios.post(
      apiUrl,
      {
        model,
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that writes unit tests.",
          },
          { role: "user", content: prompt },
          {
            role: "user",
            content: "Please include tests for edge cases and invalid inputs.",
          },
        ],
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message?.content;
  } catch (error: any) {
    const quotaError =
      error?.response?.data?.error?.code === "insufficient_quota" ||
      error?.response?.data?.error?.code === "credit_balance_exhausted" ||
      error?.response?.data?.error?.code === "invalid_api_key";
    if (quotaError) {
      return MockOpenAI.generateUnitTests(code, language);
    }
    return error.response?.data || { error: error.message };
  }
};
