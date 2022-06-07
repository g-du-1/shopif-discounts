(async () => {
  const fetchCart = async () => {
    const response = await fetch("/cart.js");
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    return data;
  };

  const fetchOffers = async () => {
    const response = await fetch("/apps/shopif-discounts/api/ext/v1/offers");
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    return data;
  };

  const calculateDiscount = (cartItems, offerIds) => {
    let totalDiscount = 0;

    cartItems.forEach((item) => {
      if (offerIds.includes(item.product_id)) {
        const origFullPrice = item.quantity * item.price;
        const discountBatches = Math.floor(item.quantity / 3);
        const totalBatchesPrice = 1000 * discountBatches;
        const remaining = item.quantity % 3;
        const remainingFullPrice = remaining * item.price;
        const discountedPrice = remainingFullPrice + totalBatchesPrice;
        totalDiscount += origFullPrice - discountedPrice;
      }
    });

    return totalDiscount;
  };

  const cart = await fetchCart();
  const offers = await fetchOffers();

  const cartItems = cart.items;
  const offerIds = offers.map((item) =>
    parseInt(item.gid.replace("gid://shopify/Product/", ""))
  );

  const cartDiscountToBeApplied = calculateDiscount(cartItems, offerIds);
})();
