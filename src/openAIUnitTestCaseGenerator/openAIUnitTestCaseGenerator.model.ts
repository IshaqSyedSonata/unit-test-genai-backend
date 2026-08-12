export type SupportedLanguage = "python" | "java" | "csharp";

export interface OpenAIUnitTestCaseGeneratorRequest {
  code: string;
  language: SupportedLanguage | string;
}

export interface OpenAIUnitTestCaseGeneratorResponse {
  tests: string | { error?: string | { message?: string } };
}

export interface OpenAIUnitTestCaseGeneratorErrorResponse {
  error: string | unknown;
}

const SUPPORTED_LANGUAGES: SupportedLanguage[] = ["python", "java", "csharp"];

export const isValidOpenAIUnitTestCaseRequest = (
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
