import { Router } from "express";
import { generate } from "./cursorUnitTestCaseGenerator.controller";

const createCursorUnitTestCaseGeneratorRouter = (): Router => {
  const expressRouter = Router();
  expressRouter.post("/", generate);
  return expressRouter;
};

export default createCursorUnitTestCaseGeneratorRouter();
