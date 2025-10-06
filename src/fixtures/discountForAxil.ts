import type { CustomerDiscountObj } from "../product.types";

export const axilDiscount: CustomerDiscountObj = {
  customer: "Axil Coffee Roasters - discounts",
  description:
    "Gets a discount on Stand out Ads where the price drops to $299.99 per ad",
  discounts: [
    {
      type: "priceReduction",
      productId: "standout",
      parameters: {
        discountPriceInCents: 29999,
      },
    },
  ],
};
