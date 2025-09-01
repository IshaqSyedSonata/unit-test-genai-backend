import { Request, Response } from "express";
import { generateUnitTests } from "../services/openaiService";
import { validateCode } from "../utils/validateCode";

export const generateTestsController = async (req: Request, res: Response) => {
  const { code, language } = req.body;

  if (!validateCode(code, language)) {
    return res.status(400).json({ error: "Invalid code or language" });
  }

  try {
    const result = await generateUnitTests(code, language);
    res.json({ tests: result });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate unit tests" });
  }
};