import { describe, expect, test } from "vitest";
import { calculateDiscount } from "./priceReduction";

describe("priceReduction", () => {
  test("base case - one item", () => {
    expect(
      calculateDiscount({
        parameters: { discountPriceInCents: 20 },
        itemCount: 1,
        priceInCents: 45,
      }),
    ).toEqual(25);
  });

  test("two items", () => {
    expect(
      calculateDiscount({
        parameters: { discountPriceInCents: 20 },
        itemCount: 2,
        priceInCents: 45,
      }),
    ).toEqual(50);
  });
});
