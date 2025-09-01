import { Request, Response } from 'express';
import { generateUnitTests } from '../services/genaiService';

export async function generateUnitTestCases(req: Request, res: Response) {
  const { code, language } = req.body;
  console.log('Received code:', code);
  console.log('Received language:', language);
  try {
    const testCases = await generateUnitTests(code, language);
    res.json({ testCases });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to generate test cases.' });
  }
}
