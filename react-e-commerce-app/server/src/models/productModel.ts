import mongoose from 'mongoose';
import { type IProduct } from '../types/Product';

const productSchema = new mongoose.Schema<IProduct>({
	name: {
		type: String,
		required: [true, 'A Product Must Have A Name'],
		unique: true,
		trim: true,
	},
	price: {
		type: Number,
		required: [true, 'A Product Must Have A Price'],
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
		required: [true, 'A Product Must Have A Description'],
	},
	images: {
		type: [String],
		required: [true, 'A Product Must Have An Image'],
	},
	badges: {
		type: [
			{
				text: {
					type: String,
					required: [true, 'A Badge Must Have An Text Field'],
				},
				startDate: {
					type: Date,
					required: [true, 'A Badge Must Have A Start Date'],
				},
				endDate: {
					type: Date,
					required: [true, 'A Badge Must Have A End Date'],
				},
			},
		],
	},
	categoryIds: {
		type: [String],
		required: [true, 'A Product Must Have A Category ID'],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	updatedAt: {
		type: Date,
		default: Date.now(),
	},
});

export default mongoose.model('Product', productSchema);
