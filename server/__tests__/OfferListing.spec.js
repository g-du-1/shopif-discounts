import { describe, expect, test, vi } from "vitest";
import * as OfferService from "../offer/OfferService.js";

describe("Offer Listing", async () => {
  test("GetOffers returns an array", async () => {
    expect(Array.isArray(await OfferService.getOffers())).toBe(true);
  });
});
