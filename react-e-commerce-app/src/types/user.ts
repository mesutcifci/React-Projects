export interface IUser {
  id: string;
  email: string;
  fullName: string;
  productsForUser: string[];
  favoriteProducts: string[];
  productsInCart: string[];
}
