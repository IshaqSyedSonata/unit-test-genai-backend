import request from "supertest";
import express from "express";
import generateTestsRoute from "../src/routes/generateTests";

const app = express();
app.use(express.json());
app.use("/generate-tests", generateTestsRoute);

describe("POST /generate-tests", () => {
  it("should return 400 for invalid input", async () => {
    const res = await request(app)
      .post("/generate-tests")
      .send({ code: "", language: "" });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  // it("should return 200 and test cases for valid Python code", async () => {
  //   const res = await request(app)
  //     .post("/generate-tests")
  //     .send({ code: "def add(a, b): return a + b", language: "python" });
  //   expect(res.status).toBe(200);
  //   expect(res.body).toHaveProperty("tests");
  //   expect(typeof res.body.tests).toBe("string");
  // });
});
