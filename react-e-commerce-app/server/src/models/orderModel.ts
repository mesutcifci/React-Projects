import mongoose from 'mongoose';
import { type IOrder } from '../types/order';

const orderSchema = new mongoose.Schema<IOrder>(
	{
		user: {
			type: mongoose.Schema.ObjectId,
			required: [true, 'An order must have a user'],
			ref: 'User',
		},
		products: [
			{
				type: mongoose.Schema.ObjectId,
				required: [true, 'An order must have a product'],
				ref: 'Product',
			},
		],
		totalAmount: {
			type: Number,
			required: [true, 'Total amount is required'],
		},
		discountAmount: Number,
		status: {
			type: String,
			default: 'Pending',
			enum: ['Pending', 'Approved', 'Shipped', 'Delivered', 'Cancelled'],
		},
	},
	{
		strictQuery: true,
		timestamps: true,
	}
);

export default mongoose.model<IOrder>('Order', orderSchema);
