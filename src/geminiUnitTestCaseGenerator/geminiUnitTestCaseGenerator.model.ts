export type SupportedLanguage = "python" | "java" | "csharp" | "node";

export interface GeminiUnitTestCaseGeneratorRequest {
  code: string;
  language: SupportedLanguage | string;
}

export interface GeminiUnitTestCaseGeneratorResponse {
  tests: string | { error?: string | { message?: string } };
}

export interface GeminiUnitTestCaseGeneratorErrorResponse {
  error: string | unknown;
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  "python",
  "java",
  "csharp",
  "node",
];

export const isValidRequest = (
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
