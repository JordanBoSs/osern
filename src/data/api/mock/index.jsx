import products from "./data/products.json";

export function fetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 500);
  });
}
