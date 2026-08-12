import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import openAIUnitTestCaseGeneratorRouter from "./openAIUnitTestCaseGenerator/openAIUnitTestCaseGenerator.router";
import geminiUnitTestCaseGeneratorRouter from "./geminiUnitTestCaseGenerator/geminiUnitTestCaseGenerator.router";
import cursorUnitTestCaseGeneratorRouter from "./cursorUnitTestCaseGenerator/cursorUnitTestCaseGenerator.router";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/openai-unit-test-case-generator", openAIUnitTestCaseGeneratorRouter);
app.use("/gemini-unit-test-case-generator", geminiUnitTestCaseGeneratorRouter);
app.use("/cursor-unit-test-case-generator", cursorUnitTestCaseGeneratorRouter);
app.get("/health", (req, res) => res.send("OK"));

app.listen(port, () => console.log(`Server running on port ${port}`));
