import dotenv from "dotenv";
import { MockOpenAI } from "../utils/mockOpenAI";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SupportedLanguage } from "./geminiUnitTestCaseGenerator.model";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const modelName = process.env.GEMINI_MODEL || "gemini-3.6-flash";
const genAI = new GoogleGenerativeAI(apiKey || "");

export const generate = async (
  code: string,
  language: SupportedLanguage
): Promise<string> => {
  const prompt = `Generate unit test cases for the following ${language} code:\n\n${code}`;

  if (!apiKey) {
    throw new Error("Gemini API key not set");
  }

  try {
    const model = genAI.getGenerativeModel({
      model: modelName,
    });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    const quotaError =
      error?.response?.data?.error?.code === "insufficient_quota" ||
      error?.response?.data?.error?.code === "invalid_api_key";
    if (quotaError) {
      return MockOpenAI.generateUnitTests(code, language);
    }
    return error.response?.data || { error: error.message };
  }
};
