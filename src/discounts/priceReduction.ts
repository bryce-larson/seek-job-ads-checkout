import {
  type DiscountRules,
  type DiscountType,
  type ICalcDiscount,
} from "../product.types";

export interface PriceReductionType extends DiscountType {
  parameters: { discountPriceInCents: number };
}

export const calculateDiscount: ICalcDiscount<PriceReductionType> = ({
  parameters,
  itemCount,
  priceInCents,
}) => {
  return (priceInCents - parameters.discountPriceInCents) * itemCount;
};

export const priceReduction: DiscountRules<PriceReductionType> = {
  type: "priceReduction",
  calculateDiscount,
};
