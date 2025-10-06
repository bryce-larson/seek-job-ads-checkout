import type { PriceReductionType } from "./discounts/priceReduction";
import type { XForYType } from "./discounts/xForYDiscount";

export interface ProductCatalogue {
  name: string;
  products: ProductCatalogueItem[];
}

export type ProductId = "classic" | "standout" | "premium";

export interface ProductCatalogueItem {
  name?: string;
  description?: string;
  priceInCents: number;
  productId: ProductId;
}

export interface DiscountType {
  type: DiscountTypes;
  parameters: Record<string, number>;
}

// function for discount calc
interface ICalcObj<T extends DiscountType> {
  parameters: T["parameters"];
  itemCount: number;
  priceInCents: ProductCatalogueItem["priceInCents"];
}
export interface ICalcDiscount<T extends DiscountType> {
  (obj: ICalcObj<T>): number;
}

type DiscountTypes = "priceReduction" | "xForY";

export type DiscountParams = XForYType | PriceReductionType;

export interface DiscountRules<T extends DiscountType> {
  type: DiscountTypes;
  calculateDiscount: ICalcDiscount<T>;
}

export interface Logger extends Console {}

// JSON object
export interface CustomerDiscountObj {
  customer: string;
  description: string;
  discounts: CustomerDiscount<DiscountParams>[];
}
export interface CustomerDiscount<T extends DiscountType> {
  type: T["type"];
  productId: ProductId;
  parameters: T["parameters"];
}
