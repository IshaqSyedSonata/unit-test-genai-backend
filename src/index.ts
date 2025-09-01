import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import generateTestsRoute from "./routes/generateTests";
import freeGenerateTestsRoute from "./routes/freeGenerateTestsRoute";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/generate-tests", generateTestsRoute);
app.use("/free-generate-test", freeGenerateTestsRoute);
app.get("/health", (req, res) => res.send("OK"));

app.listen(port, () => console.log(`Server running on port ${port}`));