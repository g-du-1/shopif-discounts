import express from "express";
import { Shopify } from "@shopify/shopify-api";
import verifyRequest from "../middleware/verify-request.js";
import * as DiscountService from "./DiscountService.js";

const router = express.Router();
const app = express();

// TODO

router.post("/api/v1/discounts", verifyRequest(app), async (req, res) => {
  try {
    const session = await Shopify.Utils.loadCurrentSession(req, res);
    const discount = req.body;
    const discountCode = await DiscountService.createDiscountCode(
      session,
      discount
    );
    res.status(200).send(discountCode);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
