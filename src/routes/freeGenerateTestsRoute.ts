import express from "express";
import { freeGenerateTestsController } from "../controllers/freeGenerateTestsController";

const router = express.Router();

router.post("/", freeGenerateTestsController);

export default router;
