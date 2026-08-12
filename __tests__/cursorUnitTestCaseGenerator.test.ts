import request from "supertest";
import express from "express";
import cursorUnitTestCaseGeneratorRouter from "../src/cursorUnitTestCaseGenerator/cursorUnitTestCaseGenerator.router";

const app = express();
app.use(express.json());
app.use("/cursor-unit-test-case-generator", cursorUnitTestCaseGeneratorRouter);

describe("POST /cursor-unit-test-case-generator", () => {
  it("should return 400 for invalid input", async () => {
    const res = await request(app)
      .post("/cursor-unit-test-case-generator")
      .send({ code: "", language: "" });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
