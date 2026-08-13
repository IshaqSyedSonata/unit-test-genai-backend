import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import openAIUnitTestCaseGeneratorRouter from "./openAIUnitTestCaseGenerator/openAIUnitTestCaseGenerator.router";
import geminiUnitTestCaseGeneratorRouter from "./geminiUnitTestCaseGenerator/geminiUnitTestCaseGenerator.router";
import cursorUnitTestCaseGeneratorRouter from "./cursorUnitTestCaseGenerator/cursorUnitTestCaseGenerator.router";

dotenv.config();

const port: string | number = process.env.PORT || 3000;

const createApp = (): Application => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(
    "/openai-unit-test-case-generator",
    openAIUnitTestCaseGeneratorRouter
  );
  app.use(
    "/gemini-unit-test-case-generator",
    geminiUnitTestCaseGeneratorRouter
  );
  app.use(
    "/cursor-unit-test-case-generator",
    cursorUnitTestCaseGeneratorRouter
  );
  app.get("/health", (_req: Request, res: Response) => res.send("OK"));

  return app;
};

export const app = createApp();

export const listen = (): void => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
};
