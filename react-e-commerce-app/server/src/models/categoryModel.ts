import mongoose from 'mongoose';
import { type ICategory } from '../types/category';
import slugify from 'slugify';

const categorySchema = new mongoose.Schema<ICategory>(
	{
		name: {
			type: String,
			required: [true, 'Name is required'],
			trim: true,
			unique: true,
		},
		value: {
			type: String,
			required: [true, 'Value is required'],
			lowercase: true,
			unique: true,
		},
		parentId: {
			type: mongoose.Schema.ObjectId,
			ref: 'Category',
		},
		slug: {
			type: String,
			lowercase: true,
		},
		level: {
			type: Number,
			required: [true, 'Level is required'],
			min: [1, 'Level cannot be smaller than 1'],
		},
	},
	{
		strictQuery: true,
	}
);

categorySchema.pre('save', function () {
	this.slug = slugify(this.name, { lower: true });
});

export default mongoose.model<ICategory>('Category', categorySchema);
