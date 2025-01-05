import type { Document, Types } from 'mongoose';

export interface IOrder extends Document {
	user: Types.ObjectId;
	products: [Types.ObjectId];
	totalAmount: number;
	discountAmount?: number;
	status: string;
	createdAt: Date;
	updatedAt: Date;
}
