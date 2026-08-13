import { Request, Response } from "express";
import { generate as generateUnitTests } from "./cursorUnitTestCaseGenerator.service";
import {
  isValidRequest,
  SupportedLanguage,
} from "./cursorUnitTestCaseGenerator.model";

export const generate = async (req: Request, res: Response): Promise<void> => {
  const { code, language } = req.body;

  if (!isValidRequest(code, language)) {
    res.status(400).json({ error: "Invalid code or language" });
    return;
  }

  try {
    const result = await generateUnitTests(
      code,
      language.toLowerCase() as SupportedLanguage
    );
    res.json({ tests: result });
  } catch (error) {
    console.error("Error in cursorUnitTestCaseGenerator:", error);
    res.status(500).json({ error });
  }
};
