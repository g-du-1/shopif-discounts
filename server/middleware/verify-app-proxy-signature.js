import { createHmac, timingSafeEqual } from "crypto";

// TODO

export const checkSignature = (queryObj) => {
  const signature = queryObj.signature;

  const params = [];
  for (const key in queryObj) {
    if (key != "signature") {
      params.push(key + "=" + queryObj[key]);
    }
  }
  const sortedParams = params.sort().join("");

  const calculatedSignature = createHmac(
    "sha256",
    process.env.SHOPIFY_API_SECRET
  )
    .update(sortedParams)
    .digest("hex");

  return timingSafeEqual(
    Buffer.from(calculatedSignature),
    Buffer.from(signature)
  );
};

const verifySignature = (req, res, next) => {
  if (!checkSignature(req.query)) {
    return res.status(403).send("Forbidden!");
  }
  next();
};

export default verifySignature;
