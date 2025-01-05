import mongoose, { Types } from 'mongoose';
import { type IBasket } from '../types/basket';

const basketSchema = new mongoose.Schema<IBasket>(
	{
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: [true, 'Cannot create basket without user'],
			unique: true,
		},
		products: [
			{
				product: {
					type: Types.ObjectId,
					ref: 'Product',
					required: [true, 'Product is required'],
				},
				quantity: {
					type: Number,
					required: [true, 'Quantity is required'],
					min: [1, 'Quantity cannot be less than 1'],
				},
			},
		],
	},
	{ timestamps: true }
);

export default mongoose.model<IBasket>('Basket', basketSchema);
