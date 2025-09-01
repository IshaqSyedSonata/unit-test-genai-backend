import express from "express";
import { generateTestsController } from "../controllers/generateTestsController";

const router = express.Router();

router.post("/", generateTestsController);

export default router;