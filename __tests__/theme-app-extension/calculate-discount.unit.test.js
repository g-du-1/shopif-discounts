import { describe, expect, test, vi } from "vitest";

// TODO

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

describe("Theme App Extension - calculateDiscount", async () => {
  test("It returns the correct discount", async () => {
    let mockCartItems1 = [
      {
        quantity: 5,
        price: 450,
        product_id: 6810701430922,
      },
      {
        quantity: 1,
        price: 573,
        product_id: 6810701791370,
      },
      {
        quantity: 6,
        price: 242,
        product_id: 6810701791111,
      },
    ];

    const mockOffers = [6810701430922, 6810701168778, 6810701234314];

    let discount = calculateDiscount(mockCartItems1, mockOffers);
    expect(discount).toEqual(350);

    let mockCartItems2 = [
      {
        quantity: 7,
        price: 450,
        product_id: 6810701430922,
      },
      {
        quantity: 1,
        price: 573,
        product_id: 6810701791370,
      },
      {
        quantity: 6,
        price: 242,
        product_id: 6810701791111,
      },
    ];

    let discount2 = calculateDiscount(mockCartItems2, mockOffers);
    expect(discount2).toEqual(700);

    let mockCartItems3 = [
      {
        quantity: 9,
        price: 450,
        product_id: 6810701430922,
      },
      {
        quantity: 1,
        price: 573,
        product_id: 6810701791370,
      },
      {
        quantity: 3,
        price: 500,
        product_id: 6810701234314,
      },
    ];

    let discount3 = calculateDiscount(mockCartItems3, mockOffers);
    expect(discount3).toEqual(1550);

    let mockCartItems4 = [
      {
        quantity: 2,
        price: 450,
        product_id: 6810701430922,
      },
      {
        quantity: 3,
        price: 573,
        product_id: 6810701168778,
      },
      {
        quantity: 3,
        price: 500,
        product_id: 6810701234314,
      },
    ];

    let discount4 = calculateDiscount(mockCartItems4, mockOffers);
    expect(discount4).toEqual(1219);
  });
});
