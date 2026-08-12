import express from "express";
import { geminiUnitTestCaseGeneratorController } from "./geminiUnitTestCaseGenerator.controller";

const router = express.Router();

router.post("/", geminiUnitTestCaseGeneratorController);

export default router;
