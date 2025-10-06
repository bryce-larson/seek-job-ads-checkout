import { describe, expect, test, vi } from "vitest";
import { PricingRules, type Logger } from "./pricingRules";
import { axilDiscount } from "./fixtures/discountForAxil";
import type {
  CustomerDiscount,
  ProductCatalogueItem,
  ProductId,
} from "./product.types";
import type { XForYType } from "./discounts/xForYDiscount";
import type { PriceReductionType } from "./discounts/priceReduction";

const defaultProductCatalogueItem: ProductCatalogueItem[] = [
  {
    productId: "classic",
    priceInCents: 29999,
  },
];

describe("Pricing Rules", () => {
  test("basic xForY", () => {
    const customerDiscounts: CustomerDiscount<XForYType>[] = [
      {
        type: "xForY",
        productId: "classic",
        parameters: {
          xForNum: 3,
          yForNum: 2,
        },
      },
    ];
    const pricingRules = PricingRules.new({
      customerDiscounts,
    });

    const items: ProductId[] = ["classic", "classic", "classic"];
    expect(
      pricingRules.calcDiscounts({
        items,
        products: defaultProductCatalogueItem,
      }),
    ).toEqual(29999);
  });

  test("basic priceReduction", () => {
    const customerDiscounts: CustomerDiscount<PriceReductionType>[] = [
      {
        type: "priceReduction",
        productId: "classic",
        parameters: {
          discountPriceInCents: 19999,
        },
      },
    ];
    const pricingRules = PricingRules.new({
      customerDiscounts,
    });

    const items: ProductId[] = ["classic"];
    expect(
      pricingRules.calcDiscounts({
        items,
        products: defaultProductCatalogueItem,
      }),
    ).toEqual(10000);
  });

  test("logs error if customer has rule not defined", () => {
    const customerDiscounts: CustomerDiscount<any>[] = [
      {
        type: "madeUpRule",
        productId: "classic",
        parameters: {},
      },
    ];
    const logErrorFn = vi.fn();
    const pricingRules = PricingRules.new({
      customerDiscounts,
      logger: { error: logErrorFn } as unknown as Logger,
    });
    const items: ProductId[] = ["classic"];
    expect(
      pricingRules.calcDiscounts({
        items,
        products: defaultProductCatalogueItem,
      }),
    ).toEqual(0);
    expect(logErrorFn).toHaveBeenCalledExactlyOnceWith(
      "PricingRules calcDiscounts(), not rule for customer discount",
      {
        type: "madeUpRule",
      },
    );
  });
});
