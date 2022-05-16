import request from "supertest";
import { describe, expect, test, vi } from "vitest";

import { serve } from "./serve.js";

vi.mock(`${process.cwd()}/server/middleware/verify-request.js`, () => ({
  default: vi.fn(() => (req, res, next) => {
    next();
  }),
}));

describe("Offers API", async () => {
  const { app } = await serve(process.cwd(), false);
  test("GET /api/v1/offers returns json array", async () => {
    const response = await request(app)
      .get("/api/v1/offers")
      .set("Accept", "application/json");
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toEqual(true);
  });
});
