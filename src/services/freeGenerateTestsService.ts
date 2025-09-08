import axios from "axios";
import dotenv from "dotenv";
import { generateMockUnitTests } from "../utils/mockOpenAI";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
export const freeGenerateUnitTests = async (
  code: string,
  language: "python" | "java" | "csharp"
): Promise<string> => {
  const prompt = `Generate unit test cases for the following ${language} code:\n\n${code}`;
  if (!genAI) {
    throw new Error("OpenAI API key not set");
  }
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate unit test cases for the following ${language} code:\n\n${code}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
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
