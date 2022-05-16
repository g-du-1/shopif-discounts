// TODO
// Change to module.exports
// Validate here

import { storeOffersService, getOffersService } from "./offer-service.js";

export const getAllOffers = async (req, res, next) => {
  try {
    const offers = await getOffersService();
    res.status(200).send(offers);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const storeOffers = async (req, res, next) => {
  try {
    const offers = req.body;
    const response = storeOffersService(offers);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
