import type { CustomerDiscountObj } from "../product.types";

export const secondBiteDiscount: CustomerDiscountObj = {
  customer: "Second Bite",
  description: "Gets a 3 for 2 deal on Classic Ads",
  discounts: [
    {
      type: "xForY",
      productId: "classic",
      parameters: {
        xForNum: 3,
        yForNum: 2,
      },
    },
  ],
};
