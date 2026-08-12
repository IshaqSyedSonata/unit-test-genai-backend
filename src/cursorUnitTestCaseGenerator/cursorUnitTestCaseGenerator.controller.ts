import { Request, Response } from "express";
import { cursorUnitTestCaseGenerator } from "./cursorUnitTestCaseGenerator.service";
import {
  isValidCursorUnitTestCaseRequest,
  SupportedLanguage,
} from "./cursorUnitTestCaseGenerator.model";

export const cursorUnitTestCaseGeneratorController = async (
  req: Request,
  res: Response
) => {
  const { code, language } = req.body;

  if (!isValidCursorUnitTestCaseRequest(code, language)) {
    return res.status(400).json({ error: "Invalid code or language" });
  }

  try {
    const result = await cursorUnitTestCaseGenerator(
      code,
      language.toLowerCase() as SupportedLanguage
    );
    res.json({ tests: result });
  } catch (error) {
    console.error("Error in cursorUnitTestCaseGenerator:", error);
    res.status(500).json({ error: error });
  }
};
