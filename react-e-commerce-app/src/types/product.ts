import { IComment } from "./comment";

export interface IProductDescription {
  details: string;
  materials: string[];
}

export interface IBase {
  name: string;
  displayName: string;
}

export interface IPrimaryCategory extends IBase {}

export interface ISecondaryCategory extends IBase {}

export interface ITertiaryCategory extends IBase {}

export interface ICollection extends IBase {}

export interface IProduct {
  id: string;
  colors: string[];
  sizes: string[];
  price: number;
  stockAmount: number;
  amount: number;
  isFavorite: boolean;
  isInCart: boolean;
  discountRate: number;
  description: IProductDescription;
  primaryCategories: IPrimaryCategory[];
  secondaryCategories: ISecondaryCategory[];
  tertiaryCategories: ITertiaryCategory[];
}
