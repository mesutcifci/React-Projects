import mongoose, { type Query } from 'mongoose';
import { type IProduct } from '../types/product';

const productSchema = new mongoose.Schema<IProduct>(
	{
		name: {
			type: String,
			required: [true, 'A product must have a name'],
			unique: true,
			trim: true,
		},
		price: {
			type: Number,
			required: [true, 'A product must have a price'],
		},
		discountPrice: Number,
		currency: {
			type: String,
			default: 'USD',
		},
		stock: {
			type: Number,
			default: 0,
		},
		ratingsAverage: {
			type: Number,
			default: 5,
		},
		ratingsQuantity: {
			type: Number,
			default: 0,
		},
		description: {
			type: String,
			trim: true,
			required: [true, 'A product must have a description'],
		},
		images: {
			type: [String],
			required: [true, 'A product must have an image'],
		},
		badges: {
			type: [
				{
					text: {
						type: String,
						required: [true, 'A badge must have an text field'],
					},
					startDate: {
						type: Date,
						required: [true, 'A badge must have a start date'],
					},
					endDate: {
						type: Date,
						required: [true, 'A badge must have a end date'],
					},
				},
			],
		},
		categories: {
			type: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'Category',
					required: true,
				},
			],
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		updatedAt: {
			type: Date,
			default: Date.now,
		},
		isActive: {
			type: Boolean,
			default: false,
		},
	},
	{
		strictQuery: true,
	}
);

// Do not return inactive products to client
productSchema.pre<Query<any, any>>(/^find/, function (next) {
	void this.find({ isActive: true });
	next();
});

export default mongoose.model<IProduct>('Product', productSchema);
