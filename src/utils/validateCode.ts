export const validateCode = (code: string, language: string): boolean => {
  return typeof code === "string" && code.trim().length > 0 &&
    ["python", "java", "csharp"].includes(language.toLowerCase());
};