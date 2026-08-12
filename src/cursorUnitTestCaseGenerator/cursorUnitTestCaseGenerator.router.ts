import express from "express";
import { cursorUnitTestCaseGeneratorController } from "./cursorUnitTestCaseGenerator.controller";

const router = express.Router();

router.post("/", cursorUnitTestCaseGeneratorController);

export default router;
