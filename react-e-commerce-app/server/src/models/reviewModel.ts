import mongoose, { type Model, type Types } from 'mongoose';
import { type IReview } from '../types/review';
import Product from './productModel';

interface IReviewModel extends Model<IReview> {
	calculateAverageRating: (productId: Types.ObjectId | string) => Promise<void>;
}

const reviewSchema = new mongoose.Schema<IReview>(
	{
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
		review: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		strictQuery: true,
	}
);

reviewSchema.statics.calculateAverageRating = async function (productId) {
	const stats = await this.aggregate([
		{
			$match: { product: productId },
		},
		{
			$group: {
				_id: '$product',
				ratingsQuantity: { $sum: 1 },
				ratingsAverage: { $avg: '$rating' },
			},
		},
	]);

	await Product.findByIdAndUpdate(productId, {
		ratingsAverage: stats[0].ratingsAverage,
		ratingsQuantity: stats[0].ratingsQuantity,
	});
};

reviewSchema.post(/save|^findOneAnd/, async function (doc) {
	await doc.constructor.calculateAverageRating(doc.product);
});

export default mongoose.model<IReview, IReviewModel>('Review', reviewSchema);
