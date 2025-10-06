import { describe, expect, it, vi } from "vitest";
import { Checkout } from "./CheckOut";
import { productsForRecruiters } from "./fixtures/productsForRecruiters";
import { axilDiscount } from "./fixtures/discountForAxil";
import { secondBiteDiscount } from "./fixtures/discountForSecondBite";
import { myerDiscount } from "./fixtures/discountForMyer";
import { PricingRules, type Logger } from "./pricingRules";
import type { ProductId } from "./product.types";

describe("basic - no discounts", () => {
  it("should provide total for defaults", () => {
    const co = Checkout.new({ productList: productsForRecruiters.products });
    co.add(`classic`);
    co.add(`standout`);
    co.add(`premium`);
    expect(co.total()).toEqual("$987.97");
  });
  it("should provide total for defaults", () => {
    const co = Checkout.new({ productList: productsForRecruiters.products });
    co.add(`classic`);
    co.add(`classic`);
    co.add(`premium`);
    expect(co.total()).toEqual("$934.97");
  });
});

describe("price reduction discount", () => {
  it("calls logger.warn when missing product", () => {
    const warnLog = vi.fn();
    const co = Checkout.new({
      productList: productsForRecruiters.products,
      logger: { warn: warnLog } as unknown as Logger,
    });
    co.add("badProductId" as ProductId);
    expect(warnLog).toHaveBeenCalled();
  });
});

describe("price reduction discount", () => {
  it("should apply discount for axil", () => {
    const pricingRules = PricingRules.new({
      customerDiscounts: axilDiscount.discounts,
    });
    const co = Checkout.new({
      productList: productsForRecruiters.products,
      pricingRules,
    });
    co.add(`standout`);
    co.add(`standout`);
    co.add(`standout`);
    co.add(`premium`);
    expect(co.total()).toEqual("$1294.96");
  });
});

describe("X for Y discount", () => {
  it("should apply discount for SecondBite", () => {
    const pricingRules = PricingRules.new({
      customerDiscounts: secondBiteDiscount.discounts,
    });
    const co = Checkout.new({
      productList: productsForRecruiters.products,
      pricingRules,
    });
    co.add(`classic`);
    co.add(`classic`);
    co.add(`classic`);
    co.add(`premium`);
    expect(co.total()).toEqual("$934.97");
  });
});

describe("Myer discounts", () => {
  const addToCard = (co: Checkout) => {
    co.add(`standout`);
    co.add(`standout`);
    co.add(`standout`);
    co.add(`standout`);
    co.add(`standout`);
    co.add(`premium`);
  };

  it("cost without discounts", () => {
    const co = Checkout.new({
      productList: productsForRecruiters.products,
    });
    addToCard(co);
    expect(co.total()).toEqual("$2009.94");
  });
  it("cost with discounts", () => {
    // 2009.94 from previous, -5.00 for premium discount , -322.99 for standout (5 for 4)
    const priceWithDiscounts = (200994 - (500 + 32299)) / 100;
    const pricingRules = PricingRules.new({
      customerDiscounts: myerDiscount.discounts,
    });
    const co = Checkout.new({
      productList: productsForRecruiters.products,
      pricingRules,
    });
    addToCard(co);
    expect(co.total()).toEqual(`$${priceWithDiscounts}`);
  });
});
