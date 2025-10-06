import type { PricingRules } from "./PricingRules";
import type { Logger, ProductCatalogueItem, ProductId } from "./product.types";

export interface ICheckout {
  productList: ProductCatalogueItem[];
  pricingRules?: PricingRules;
  logger?: Logger;
}

export class Checkout {
  private items: ProductId[];
  private productList: ProductCatalogueItem[];
  private logger: Logger;
  private pricingRules?: PricingRules;

  static new(props: ICheckout): Checkout {
    const logger = props.logger ?? console;
    return new Checkout({ logger, ...props });
  }

  private constructor({ productList, pricingRules, logger }: ICheckout) {
    this.items = [];
    // TODO add validation of pricingRules and productList
    this.pricingRules = pricingRules;
    this.productList = productList;
    this.logger = logger!;
  }

  /**
   *
   * @param productId to be added
   * @returns boolean if the product was successfully added
   */
  add(productId: ProductId): boolean {
    if (this.productList.some((p) => p.productId === productId)) {
      this.items.push(productId);
      return true;
    } else {
      this.logger.warn(
        "Checkout add(), cannot find productId in productList: ",
        { productId, productList: this.productList },
      );
      return false;
    }
  }

  /**
   *
   * @returns the total price of all items that have been added, including discounts
   */
  total(): string {
    const totalInCents = this.items.reduce((acc, productId) => {
      const priceInCents =
        this.productList.find((p) => p.productId === productId)?.priceInCents ??
        0;
      return acc + priceInCents;
    }, 0);

    const discountInCents =
      this.pricingRules?.calcDiscounts({
        items: this.items,
        products: this.productList,
      }) ?? 0;

    return `$${((totalInCents - discountInCents) / 100).toFixed(2)}`;
  }
}
