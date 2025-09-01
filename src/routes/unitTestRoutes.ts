import { Router } from 'express';
import { generateUnitTestCases } from '../controllers/unitTestController';

const router = Router();

router.post('/generate', generateUnitTestCases);

export default router;
