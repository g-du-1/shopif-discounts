(async () => {
  console.log("Theme app extension loading...");

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

  const cart = await fetchCart();
  console.log(cart);

  const offers = await fetchOffers();
  console.log(offers);
})();
