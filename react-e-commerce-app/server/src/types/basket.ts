import { type Types } from 'mongoose';

export interface IBasket {
	products: Types.ObjectId[];
}
