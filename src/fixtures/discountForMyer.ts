import type { CustomerDiscountObj } from "../product.types";

export const myerDiscount: CustomerDiscountObj = {
  customer: "Myer - discounts",
  description:
    "Gets a 5 for 4 deal on Stand out Ads\n.Gets a discount on Premium Ads where the price drops to $389.99 per ad",
  discounts: [
    {
      type: "xForY",
      productId: "standout",
      parameters: {
        xForNum: 5,
        yForNum: 4,
      },
    },
    {
      type: "priceReduction",
      productId: "premium",
      parameters: {
        discountPriceInCents: 38999,
      },
    },
  ],
};
