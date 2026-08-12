import { Request, Response } from "express";
import { geminiUnitTestCaseGenerator } from "./geminiUnitTestCaseGenerator.service";
import {
  isValidGeminiUnitTestCaseRequest,
  SupportedLanguage,
} from "./geminiUnitTestCaseGenerator.model";

export const geminiUnitTestCaseGeneratorController = async (
  req: Request,
  res: Response
) => {
  const { code, language } = req.body;

  if (!isValidGeminiUnitTestCaseRequest(code, language)) {
    return res.status(400).json({ error: "Invalid code or language" });
  }

  try {
    const result = await geminiUnitTestCaseGenerator(
      code,
      language.toLowerCase() as SupportedLanguage
    );
    res.json({ tests: result });
  } catch (error) {
    console.error("Error in geminiUnitTestCaseGenerator:", error);
    res.status(500).json({ error: error });
  }
};
