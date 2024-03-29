import mongoose from 'mongoose';
import { type IReview } from '../types/review';

const reviewSchema = new mongoose.Schema<IReview>({
	product: {
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Product',
	},
	user: {
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'User',
	},
	rating: {
		type: Number,
		required: true,
		min: 1,
		max: 5,
	},
	reviewText: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model<IReview>('Review', reviewSchema);
