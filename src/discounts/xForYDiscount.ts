import {
  type DiscountRules,
  type DiscountType,
  type ICalcDiscount,
} from "../product.types";

export interface XForYType extends DiscountType {
  parameters: { xForNum: number; yForNum: number };
  type: "xForY";
}

export const calculateDiscount: ICalcDiscount<XForYType> = ({
  parameters,
  itemCount,
  priceInCents,
}) => {
  const numX = Math.floor(itemCount / parameters.xForNum);
  return (parameters.xForNum - parameters.yForNum) * numX * priceInCents;
};

export const xforYDiscount: DiscountRules<XForYType> = {
  type: "xForY",
  calculateDiscount,
};
