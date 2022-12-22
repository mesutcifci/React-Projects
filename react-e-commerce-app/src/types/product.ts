import { IComment } from "./comment";

export interface IProductDescription {
  details: string;
  materials: string[];
}

export interface IBase {
  id: string;
  name: string;
}

export interface IProduct {
  id: string;
  name: string;
  imageUrl: string;
  colors: string[];
  sizes: string[];
  price: number;
  stockAmount: number;
  amount: number;
  discountRate: number;
  description: IProductDescription;
  primaryCategories: IBase[];
  secondaryCategories: IBase[];
  tertiaryCategories: IBase[];
  collections: IBase[];
}
