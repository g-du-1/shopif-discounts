import express from "express";
import verifyRequest from "../middleware/verify-request.js";
import * as OfferService from "./OfferService.js";

const router = express.Router();
const app = express();

// TODO Validate

router.get("/api/v1/offers", verifyRequest(app), async (req, res) => {
  const offers = await OfferService.getOffers();
  res.send(offers);
});

router.post("/api/v1/offers", verifyRequest(app), async (req, res) => {
  try {
    const offers = req.body;
    const response = await OfferService.storeOffers(offers);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
