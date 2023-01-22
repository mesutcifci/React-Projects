export interface IUserProduct {
  id: string;
  amount: number;
}

export interface IUser {
  id: string;
  email: string;
  fullName: string;
  favoriteProductIds: string[];
  userProductsInCart: IUserProduct[];
}
