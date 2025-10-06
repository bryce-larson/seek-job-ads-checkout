# Seek Coding Exercise

This code is designed to be either run in the browser or server, it designed to be consumed as a package. Package rollup has not yet be implemented.

## Usage

```typescript
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
co.total();
```

## Development

### install

`pnpm install`

### test

`pnpm test`

### format

`pnpm format`
