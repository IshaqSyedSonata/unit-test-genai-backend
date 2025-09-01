import request from "supertest";
import express from "express";

const app = express();
app.get("/health", (req, res) => res.send("OK"));

describe("GET /health", () => {
  it("should return OK", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.text).toBe("OK");
  });
});