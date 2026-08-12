export type SupportedLanguage = "python" | "java" | "csharp" | "node";

export interface CursorUnitTestCaseGeneratorRequest {
  code: string;
  language: SupportedLanguage | string;
}

export interface CursorUnitTestCaseGeneratorResponse {
  tests: string | { error?: string | { message?: string } };
}

export interface CursorUnitTestCaseGeneratorErrorResponse {
  error: string | unknown;
}

const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  "python",
  "java",
  "csharp",
  "node",
];

export const isValidCursorUnitTestCaseRequest = (
  code: unknown,
  language: unknown
): code is string => {
  return (
    typeof code === "string" &&
    code.trim().length > 0 &&
    typeof language === "string" &&
    SUPPORTED_LANGUAGES.includes(language.toLowerCase() as SupportedLanguage)
  );
};
