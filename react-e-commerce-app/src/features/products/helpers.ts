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
