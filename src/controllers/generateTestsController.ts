import { Request, Response } from "express";
import { generateUnitTests } from "../services/genaiService";
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
    console.error('Error in generateUnitTests:', error);
    res.status(500).json({ error: error });
  }
};