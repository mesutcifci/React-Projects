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
  discountRate: number;
  description: IProductDescription;
  primaryCategory: string;
  secondaryCategory: string;
  tertiaryCategory: string;
  collections: string[];
  isFavorite: boolean;
}

export interface IModifiedProduct extends IProduct {
  amount: number;
}
