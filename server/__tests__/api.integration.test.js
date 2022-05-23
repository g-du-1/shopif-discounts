import request from "supertest";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { pool } from "../offer/OfferRepo.js";

import { serve } from "./serve.js";

const { app } = await serve(process.cwd(), false);

vi.mock(`${process.cwd()}/server/middleware/verify-request.js`, () => ({
  default: vi.fn(() => (req, res, next) => {
    next();
  }),
}));

beforeEach(async () => {
  await pool.query("TRUNCATE TABLE offers");
});

describe("Offers API", async () => {
  test("Saves offer(s) to database", async () => {
    const body = ["testid1", "testid2"];
    const postResponse = await request(app)
      .post("/api/v1/offers")
      .set("content-type", "application/json")
      .send(body);
    expect(postResponse.status).toEqual(200);

    const getResponse = await request(app)
      .get("/api/v1/offers")
      .set("Accept", "application/json");
    expect(getResponse.status).toEqual(200);
    expect(getResponse.body[0].gid).toEqual("testid1");
    expect(getResponse.body[1].gid).toEqual("testid2");
  });

  test("Does not save duplicate productIds", async () => {
    const body = ["testid3", "testid4", "testid3"];
    const postResponse = await request(app)
      .post("/api/v1/offers")
      .set("content-type", "application/json")
      .send(body);
    expect(postResponse.status).toEqual(200);

    const getResponse = await request(app)
      .get("/api/v1/offers")
      .set("Accept", "application/json");
    expect(getResponse.status).toEqual(200);
    expect(getResponse.body.length).toEqual(2);
    expect(getResponse.body[0].gid).toEqual("testid3");
    expect(getResponse.body[1].gid).toEqual("testid4");
  });

  test("Clears all saved productIds", async () => {
    const body = ["testid5", "testid6"];
    const postResponse = await request(app).post("/api/v1/offers").send(body);
    expect(postResponse.status).toEqual(200);

    const delResponse = await request(app).delete("/api/v1/offers");
    expect(delResponse.status).toEqual(200);

    const getResponse = await request(app).get("/api/v1/offers");
    expect(getResponse.status).toEqual(200);
    expect(getResponse.body.length).toEqual(0);
  });
});
