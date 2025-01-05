import type { Document, Types } from 'mongoose';

export interface IProduct extends Document {
	name: string;
	slug: string;
	price: number;
	discountPrice?: number;
	currency: string;
	stock: number;
	ratingsAverage: number;
	ratingsQuantity: number;
	description: string;
	isActive: boolean;
	images: [string];
	category: Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
}
