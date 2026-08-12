import request from "supertest";
import express from "express";
import openAIUnitTestCaseGeneratorRouter from "../src/openAIUnitTestCaseGenerator/openAIUnitTestCaseGenerator.router";

const app = express();
app.use(express.json());
app.use("/openai-unit-test-case-generator", openAIUnitTestCaseGeneratorRouter);

describe("POST /openai-unit-test-case-generator", () => {
  it("should return 400 for invalid input", async () => {
    const res = await request(app)
      .post("/openai-unit-test-case-generator")
      .send({ code: "", language: "" });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
