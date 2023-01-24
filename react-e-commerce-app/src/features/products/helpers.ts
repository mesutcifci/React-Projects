import { IProduct } from "../../types/product";

export const filterByIds = (data: IProduct[], productIds: string[]) => {
  const filteredData = data.filter((item) => productIds.includes(item.id));
  return filteredData;
};

export const filterByTertiaryCategory = (
  tertiaryIds: string[],
  data: IProduct[]
) => {
  let filteredData: IProduct[] = [];

  filteredData = data.filter((item) =>
    tertiaryIds.includes(item.tertiaryCategory)
  );

  return filteredData;
};

export const mapWithFavoriteProductIds = (
  products: IProduct[],
  favoriteProductIds: string[] | undefined
) => {
  if (favoriteProductIds) {
    return products.map((product) => {
      if (favoriteProductIds.includes(product.id)) {
        product.isFavorite = true;
      }
      return product;
    });
  } else {
    return products;
  }
};

export const getCachedProductsByPrimaryCategory = (primary: string) => {
  const products = JSON.parse(
    localStorage.getItem(primary) as string
  ) as IProduct[];
  return products;
};

export const getCachedProductsByPrimaryCategories = () => {
  const categoryIds = ["men", "women", "kids"];
  let products: IProduct[] = [];
  for (let index = 0; index < categoryIds.length; index++) {
    const localStorageProducts = JSON.parse(
      localStorage.getItem(categoryIds[index]) as string
    );
    if (!localStorageProducts) {
      return null;
    }
    products.push(...localStorageProducts);
  }
  return products;
};

export const sliceProductsAndAddToLocalStorage = (products: IProduct[]) => {
  const primaryCategories = ["men", "women", "kids"];
  primaryCategories.forEach((category) => {
    const filteredProducts = products.filter(
      (product) => product.primaryCategory === category
    );
    localStorage.setItem(category, JSON.stringify(filteredProducts));
  });
};
