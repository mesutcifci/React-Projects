import { IParameter } from "../../types/parameters";
import { IProduct } from "../../types/product";

export const filterByIds = (data: IProduct[], productIds: string[]) => {
  const filteredData = data.filter((item) => productIds.includes(item.id));
  return filteredData;
};

export const filterBySearchParameters = (
  tertiaryIds: string[],
  data: IProduct[],
  parameters: IParameter
) => {
  let filteredData: IProduct[] = [];

  filteredData = data.filter(
    (item) =>
      parameters.secondary.includes(item.secondaryCategory) &&
      tertiaryIds.includes(item.tertiaryCategory)
  );

  return filteredData;
};
