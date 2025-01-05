import type { Document, Types } from 'mongoose';

export interface IReview extends Document {
	product: Types.ObjectId;
	user: Types.ObjectId;
	rating: number;
	review: string;
	createdAt: Date;
}
