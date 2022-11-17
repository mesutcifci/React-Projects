import { IUser } from "./user";

export interface IComment {
  id: string;
  productId: string;
  point: number;
  text: string;
  user: IUser;
}
