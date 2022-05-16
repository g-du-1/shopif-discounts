import { describe, expect, test, vi } from "vitest";
import { getOffersService } from "./offer-service.js";

describe("offer service", async () => {
  test("GetOffers returns an array", async () => {
    expect(Array.isArray(await getOffersService())).toBe(true);
  });
});
