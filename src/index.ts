import express from "express";
import dotenv from "dotenv";
import generateTestsRoute from "./routes/generateTests";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/generate-tests", generateTestsRoute);

app.get("/health", (req, res) => res.send("OK"));

app.listen(port, () => console.log(`Server running on port ${port}`));