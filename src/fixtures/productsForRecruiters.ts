import type { ProductCatalogue } from "../product.types";

export const productsForRecruiters: ProductCatalogue = {
  name: "Seek products for recruiters",
  products: [
    {
      name: "Classic Ad",
      description: "Offers the most basic level of advertisement",
      priceInCents: 26999,
      productId: "classic",
    },
    {
      name: "Stand out Ad",
      description:
        "Allows advertisers to use a company logo and use a longer presentation text",
      priceInCents: 32299,
      productId: "standout",
    },
    {
      name: "Premium Ad",
      description:
        "Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility",
      priceInCents: 39499,
      productId: "premium",
    },
  ],
};
