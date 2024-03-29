import mongoose from 'mongoose';
import { type ICategory } from '../types/category';

const categorySchema = new mongoose.Schema<ICategory>(
	{
		name: {
			type: String,
			required: [true, 'A category must have a name'],
		},
		parentCategory: {
			type: mongoose.Schema.ObjectId,
			ref: 'Category',
		},
		children: {
			type: mongoose.Schema.ObjectId,
			ref: 'Category',
		},
		slug: {
			type: String,
			required: [true, 'Slug is required'],
		},
	},
	{
		strictQuery: true,
	}
);

export default mongoose.model<ICategory>('Category', categorySchema);
