import { IProduct } from "../../types/product";

export const filterByIds = (data: IProduct[], productIds: string[]) => {
  const filteredData = data.filter((item) => productIds.includes(item.id));
  return filteredData;
};
