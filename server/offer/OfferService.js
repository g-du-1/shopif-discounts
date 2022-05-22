// TODO

import * as OfferRepo from "./OfferRepo.js";

export const getOffers = async () => {
  return await OfferRepo.getOffers();
};

export const storeOffers = async (offers) => {
  return await OfferRepo.saveOffers(offers);
};
