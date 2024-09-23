import mongoose, { type Query } from 'mongoose';
import { type IProduct } from '../types/product';

const productSchema = new mongoose.Schema<IProduct>(
	{
		name: {
			type: String,
			required: [true, 'A product must have a name'],
			unique: true,
			trim: true,
			maxlength: [150, "A product name can't bigger than 150 character"],
			minlength: [10, 'A product name must have at least 10 character'],
		},
		price: {
			type: Number,
			required: [true, 'A product must have a price'],
			min: [1, 'Price must be bigger than 0'],
		},
		discountPrice: {
			type: Number,
			validate: {
				validator: function (value: number) {
					return value < (this as IProduct).price;
				},
				message: "Disocunt price can't bigger than original value",
			},
		},
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
			min: [1, 'Rating must be bigger than 0'],
			max: [5, 'Rating must be less than 5'],
		},
		ratingsQuantity: {
			type: Number,
			default: 0,
		},
		description: {
			type: String,
			trim: true,
			required: [true, 'A product must have a description'],
			maxlength: [
				600,
				'A product description can not bigger than 600 character',
			],
			minlength: [10, 'A product description must have at least 10 character'],
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
						maxlength: [30, 'A badge text can not bigger than 30 character'],
						minlength: [3, 'A badge text must have at least 3 character'],
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
