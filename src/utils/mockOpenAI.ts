// src/utils/mockOpenAI.ts
export async function generateMockUnitTests(code: string, language: 'python' | 'java' | 'csharp') {
  return `
# Mock Unit Test Cases for ${language.toUpperCase()} Code

def test_addition():
    assert add(2, 3) == 5

def test_subtraction():
    assert subtract(5, 2) == 3
`;
}