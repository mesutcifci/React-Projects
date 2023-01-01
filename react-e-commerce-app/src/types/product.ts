export interface IProductDescription {
  details: string;
  materials: string[];
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
  primaryCategories: string[];
  secondaryCategory: string;
  tertiaryCategory: string;
  collections: string[];
}
