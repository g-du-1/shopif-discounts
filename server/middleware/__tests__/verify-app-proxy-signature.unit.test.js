import { describe, expect, test, vi } from "vitest";
import { checkSignature } from "../verify-app-proxy-signature.js";

describe("App Proxy Middleware", async () => {
  test("checkSignature returns true when supplied a valid query object", async () => {
    const queryObj = {
      shop: "gdu1.myshopify.com",
      path_prefix: "/apps/shopif-discounts",
      timestamp: "1653388536",
      signature:
        "464c709de6cdcaf914fd59987b2d4dddff3e5ed1f901905dc67b5d2f28d71fcd",
    };
    const signatureValidity = checkSignature(queryObj);
    expect(signatureValidity).toEqual(true);
  });

  test("checkSignature returns false when supplied an invalid query object", async () => {
    const queryObj = {
      shop: "gdu1.myshopify.com",
      path_prefix: "/apps/shopif-discounts",
      timestamp: "1653388536",
      signature:
        "164c709de6cdcaf914fd59987b2d4dddff3e5ed1f901905dc67b5d2f28d71fca",
    };
    const signatureValidity = checkSignature(queryObj);
    expect(signatureValidity).toEqual(false);
  });
});
