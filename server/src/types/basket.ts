import { type Types } from 'mongoose';

export interface IBasketProduct {
	product: Types.ObjectId;
	quantity: number;
}
export interface IBasket {
	products: IBasketProduct[];
	user: Types.ObjectId;
}
