import { Router } from "express";
import { generate } from "./geminiUnitTestCaseGenerator.controller";

const createGeminiUnitTestCaseGeneratorRouter = (): Router => {
  const expressRouter = Router();
  expressRouter.post("/", generate);
  return expressRouter;
};

export default createGeminiUnitTestCaseGeneratorRouter();
