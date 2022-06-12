import request from "supertest";
import { Shopify } from "@shopify/shopify-api";
import { describe, expect, test, vi } from "vitest";

import * as DiscountService from "../discount/DiscountService.js";

import { serve } from "./serve.js";

const { app } = await serve(process.cwd(), false);

vi.mock(`${process.cwd()}/server/middleware/verify-request.js`, () => ({
  default: vi.fn(() => (req, res, next) => {
    next();
  }),
}));

describe("Discounts API", async () => {
  test("It creates and returns a 16 length discount code string when given a discount", async () => {
    const session = new Shopify.Session.Session(
      "1",
      process.env.SHOP,
      "state",
      app.get("use-online-tokens")
    );
    session.scope = Shopify.Context.SCOPES;
    session.accessToken = process.env.ADMIN_APP_TOKEN;
    session.expires = null;

    vi.spyOn(Shopify.Utils, "loadCurrentSession").mockImplementationOnce(
      () => session
    );

    const body = { discount: "348" };
    const postResponse = await request(app)
      .post("/api/v1/discounts")
      .send(body);

    const savedCode = postResponse.body.code;
    const savedCodeId = postResponse.body.id;

    expect(postResponse.status).toEqual(200);
    expect(typeof savedCode).toBe("string");
    expect(savedCode.length).toEqual(16);

    const deletedCodeId = await DiscountService.deleteDiscountCode(
      session,
      savedCodeId
    );
    expect(savedCodeId).toEqual(deletedCodeId);
  });
});
