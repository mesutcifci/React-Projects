import mongoose, { type Query } from 'mongoose';
import { type IProduct } from '../types/product';
import slugify from 'slugify';

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
		slug: {
			type: String,
			unique: true,
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
			/**
			 * value = 4.666
			 * 4.666 * 10 = 46.66
			 * round(46.66) = 47
			 * 47 / 10 = 4.7
			 */
			set: (value: number) => Math.round(value * 10) / 10,
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
		category: {
			type: mongoose.Schema.ObjectId,
			ref: 'Category',
			required: true,
		},
		isActive: {
			type: Boolean,
			default: false,
		},
	},
	{
		strictQuery: true,
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

productSchema.virtual('reviews', {
	ref: 'Review',
	foreignField: 'product',
	localField: '_id',
});

// Do not return inactive products to client
productSchema.pre<Query<any, any>>(/^find/, function (next) {
	/**
	 * #DOC
	 * We don't use async/await because the query does not executed here.
	 * Instead we add { isActive: true } to query match criteria.
	 */
	void this.find({ isActive: true });
	next();
});

productSchema.pre('save', function () {
	this.slug = slugify(this.name, { lower: true });
});

export default mongoose.model<IProduct>('Product', productSchema);
