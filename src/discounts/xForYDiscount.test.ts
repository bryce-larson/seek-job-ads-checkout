import { describe, expect, test } from "vitest";
import { calculateDiscount } from "./xForYDiscount";

describe(" 5 for 4", () => {
  const parameters = { xForNum: 5, yForNum: 4 };
  test("base case", () => {
    expect(
      calculateDiscount({
        parameters,
        itemCount: 5,
        priceInCents: 10,
      }),
    ).toBe(10); // (5 for 4) - $.10 discount
  });

  test("extra x - no additional to discount", () => {
    expect(
      calculateDiscount({
        parameters,
        itemCount: 9,
        priceInCents: 10,
      }),
    ).toBe(10);
  });

  test("double x - double discount", () => {
    expect(
      calculateDiscount({
        parameters,
        itemCount: 11,
        priceInCents: 10,
      }),
    ).toBe(20); // 2x (5 for 4) - $.20 discount
  });
});

describe("2 for 1", () => {
  const parameters = { xForNum: 2, yForNum: 1 };
  test("base case", () => {
    expect(
      calculateDiscount({
        parameters,
        itemCount: 2,
        priceInCents: 8,
      }),
    ).toBe(8);
  });
  test("double x - double discount", () => {
    expect(
      calculateDiscount({
        parameters,
        itemCount: 4,
        priceInCents: 8,
      }),
    ).toBe(16);
  });
});

describe("3 for 1", () => {
  const parameters = { xForNum: 3, yForNum: 1 };
  test("base case", () => {
    expect(
      calculateDiscount({
        parameters,
        itemCount: 3,
        priceInCents: 8,
      }),
    ).toBe(16);
  });
  test("double x - double discount", () => {
    expect(
      calculateDiscount({
        parameters,
        itemCount: 7,
        priceInCents: 10,
      }),
    ).toBe(40); // 2x (3 for 1) - $.40 off
  });
});
