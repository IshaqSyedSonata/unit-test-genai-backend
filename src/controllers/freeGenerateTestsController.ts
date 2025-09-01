import { Request, Response } from "express";
import { freeGenerateUnitTests } from "../services/freeGenerateTestsService";
import { validateCode } from "../utils/validateCode";

export const freeGenerateTestsController = async (
  req: Request,
  res: Response
) => {
  const { code, language } = req.body;
  if (!validateCode(code, language)) {
    return res.status(400).json({ error: "Invalid code or language" });
  }

  try {
    const result = await freeGenerateUnitTests(code, language);
    res.json({ tests: result });
  } catch (error) {
    console.error("Error in freeGenerateUnitTests:", error);
    res.status(500).json({ error: error });
  }
};
