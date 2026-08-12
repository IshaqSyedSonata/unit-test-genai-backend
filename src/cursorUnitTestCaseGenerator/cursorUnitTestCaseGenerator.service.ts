import { Agent, CursorAgentError } from "@cursor/sdk";
import dotenv from "dotenv";
import { generateMockUnitTests } from "../utils/mockOpenAI";
import { SupportedLanguage } from "./cursorUnitTestCaseGenerator.model";

dotenv.config();

const CURSOR_API_KEY = process.env.CURSOR_API_KEY;
const CURSOR_MODEL = process.env.CURSOR_MODEL || "composer-2.5";

export const cursorUnitTestCaseGenerator = async (
  code: string,
  language: SupportedLanguage
): Promise<string | { error: string }> => {
  if (!CURSOR_API_KEY) {
    throw new Error("Cursor API key not set");
  }

  const prompt = [
    "You are a helpful assistant that writes unit tests.",
    `Generate unit test cases for the following ${language} code.`,
    "Return ONLY the unit test source code as plain text.",
    "Do not create, edit, or delete any files.",
    "Include tests for edge cases and invalid inputs.",
    "",
    "```",
    code,
    "```",
  ].join("\n");

  try {
    const result = await Agent.prompt(prompt, {
      apiKey: CURSOR_API_KEY,
      model: { id: CURSOR_MODEL },
      local: { cwd: process.cwd() },
    });

    if (result.status === "error") {
      const message = result.error?.message || "Cursor agent run failed";
      const codeHint = result.error?.code || "";
      if (
        codeHint.includes("auth") ||
        /invalid.?api.?key|unauthorized|401/i.test(message)
      ) {
        return generateMockUnitTests(code, language);
      }
      return { error: message };
    }

    if (result.status === "cancelled") {
      return { error: "Cursor agent run was cancelled" };
    }

    return result.result ?? "";
  } catch (error: unknown) {
    if (error instanceof CursorAgentError) {
      const message = error.message || "Cursor agent failed to start";
      if (
        /invalid.?api.?key|unauthorized|401|auth/i.test(message) ||
        !CURSOR_API_KEY
      ) {
        return generateMockUnitTests(code, language);
      }
      return { error: message };
    }
    const message =
      error instanceof Error ? error.message : "Unknown Cursor SDK error";
    return { error: message };
  }
};
