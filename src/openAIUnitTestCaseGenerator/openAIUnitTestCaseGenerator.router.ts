import express from "express";
import { openAIUnitTestCaseGeneratorController } from "./openAIUnitTestCaseGenerator.controller";

const router = express.Router();

router.post("/", openAIUnitTestCaseGeneratorController);

export default router;
