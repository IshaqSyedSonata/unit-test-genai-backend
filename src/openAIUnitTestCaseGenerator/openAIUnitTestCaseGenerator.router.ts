import { Router } from "express";
import { generate } from "./openAIUnitTestCaseGenerator.controller";

const createOpenAIUnitTestCaseGeneratorRouter = (): Router => {
  const expressRouter = Router();
  expressRouter.post("/", generate);
  return expressRouter;
};

export default createOpenAIUnitTestCaseGeneratorRouter();
