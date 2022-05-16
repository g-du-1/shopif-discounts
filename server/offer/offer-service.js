// TODO

import { createOffers, getOffers } from "./offer-repo.js";

export const getOffersService = async () => {
  return await getOffers();
};

export const storeOffersService = async (offers) => {
  return await createOffers(offers);
};
