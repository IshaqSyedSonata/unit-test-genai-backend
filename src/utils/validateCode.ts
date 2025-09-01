export const validateCode = (code: string, language: string): boolean => {
  return typeof code === "string" && ["python", "java", "csharp"].includes(language.toLowerCase());
};