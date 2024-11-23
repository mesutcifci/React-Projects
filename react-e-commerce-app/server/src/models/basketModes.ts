import mongoose, { Types } from 'mongoose';
import { type IBasket } from '../types/basket';

const basketSchema = new mongoose.Schema<IBasket>({
	products: [
		{
			type: Types.ObjectId,
			ref: 'Product',
		},
	],
});

export default mongoose.model<IBasket>('Basket', basketSchema);
