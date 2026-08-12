import { Request, Response } from "express";
import { openAIUnitTestCaseGenerator } from "./openAIUnitTestCaseGenerator.service";
import {
  isValidOpenAIUnitTestCaseRequest,
  SupportedLanguage,
} from "./openAIUnitTestCaseGenerator.model";

export const openAIUnitTestCaseGeneratorController = async (
  req: Request,
  res: Response
) => {
  const { code, language } = req.body;

  if (!isValidOpenAIUnitTestCaseRequest(code, language)) {
    return res.status(400).json({ error: "Invalid code or language" });
  }

  try {
    const result = await openAIUnitTestCaseGenerator(
      code,
      language.toLowerCase() as SupportedLanguage
    );
    res.json({ tests: result });
  } catch (error) {
    console.error("Error in openAIUnitTestCaseGenerator:", error);
    res.status(500).json({ error: error });
  }
};
