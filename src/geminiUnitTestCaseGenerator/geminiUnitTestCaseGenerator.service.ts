import dotenv from "dotenv";
import { generateMockUnitTests } from "../utils/mockOpenAI";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SupportedLanguage } from "./geminiUnitTestCaseGenerator.model";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const geminiUnitTestCaseGenerator = async (
  code: string,
  language: SupportedLanguage
): Promise<string> => {
  const prompt = `Generate unit test cases for the following ${language} code:\n\n${code}`;
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Gemini API key not set");
  }
  try {
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-3.6-flash",
    });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    const quotaError =
      error?.response?.data?.error?.code === "insufficient_quota" ||
      error?.response?.data?.error?.code === "invalid_api_key";
    if (quotaError) {
      return generateMockUnitTests(code, language);
    }
    return error.response?.data || { error: error.message };
  }
};
