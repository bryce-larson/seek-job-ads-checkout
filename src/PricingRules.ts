import { priceReduction } from "./discounts/priceReduction";
import { xforYDiscount } from "./discounts/xForYDiscount";
import type {
  CustomerDiscount,
  DiscountParams,
  DiscountRules,
  Logger,
  ProductCatalogueItem,
  ProductId,
} from "./product.types";

export interface IPricingRules {
  discountRules?: DiscountRules<DiscountParams>[];
  customerDiscounts?: CustomerDiscount<DiscountParams>[];
  logger?: Logger;
}

export class PricingRules {
  static new(props: IPricingRules): PricingRules {
    // default discounts
    const discountRules =
      props.discountRules ??
      ([priceReduction, xforYDiscount] as DiscountRules<DiscountParams>[]);
    const customerDiscounts = props.customerDiscounts ?? [];
    const logger = props.logger ?? console;

    return new PricingRules({ logger, discountRules, customerDiscounts });
  }

  private discountRulesMap: Map<string, DiscountRules<DiscountParams>>;
  private customerDiscounts: CustomerDiscount<DiscountParams>[];
  private logger: Logger;

  private constructor({
    discountRules,
    customerDiscounts,
    logger,
  }: Required<IPricingRules>) {
    this.logger = logger;

    // TODO add validation of customerDiscounts and discountRules
    this.customerDiscounts = customerDiscounts;
    this.discountRulesMap = discountRules.reduce((acc, d) => {
      acc.set(d.type, d);
      return acc;
    }, new Map<string, DiscountRules<DiscountParams>>());
  }

  /**
   * Calculates the discount for the customers discount rules
   * @returns the discount in cents
   */
  public calcDiscounts({
    items,
    products,
  }: {
    items: ProductId[];
    products: ProductCatalogueItem[];
  }) {
    return this.customerDiscounts.reduce((acc, customerDiscount) => {
      const discountRule = this.discountRulesMap.get(customerDiscount.type);
      if (discountRule == null) {
        this.logger.error(
          "PricingRules calcDiscounts(), not rule for customer discount",
          { type: customerDiscount.type },
        );
        return acc;
      }
      const itemCount = items.filter(
        (item) => item === customerDiscount.productId,
      ).length;
      const product = products.find(
        (p) => p.productId === customerDiscount.productId,
      );
      if (itemCount > 0 && product != null) {
        const discount = discountRule?.calculateDiscount({
          parameters: customerDiscount.parameters,
          itemCount,
          priceInCents: product.priceInCents,
        });
        acc += discount;
      }
      return acc;
    }, 0);
  }
}
