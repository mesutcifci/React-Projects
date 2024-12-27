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
		parentId: {
			type: mongoose.Schema.ObjectId,
			ref: 'Category',
		},
		slug: {
			type: String,
			lowercase: true,
		},
		depth: {
			type: Number,
			required: [true, 'Depth is required'],
			min: [1, 'Depth cannot be smaller than 1'],
		},
		ancestor: [
			{
				name: {
					type: String,
					required: [true, 'Name is required'],
					trim: true,
					unique: true,
				},
				categoryId: {
					type: mongoose.Schema.ObjectId,
					ref: 'Category',
				},
				slug: {
					type: String,
					lowercase: true,
				},
				depth: {
					type: Number,
					required: [true, 'Depth is required'],
					min: [1, 'Depth cannot be smaller than 1'],
				},
			},
		],
		images: [
			{
				url: {
					type: String,
					required: [true, 'Image url is required'],
					trim: true,
					maxLength: [500, 'url cannot be more than 500 characters'],
				},
				link: {
					type: String,
					trim: true,
					maxLength: [500, 'link cannot be more than 500 characters'],
				},
				text: {
					type: String,
					trim: true,
					maxLength: [100, 'text cannot be more than 100 characters'],
				},
				textBackgroundColor: {
					type: String,
					trim: true,
					maxLength: [
						100,
						'textBackgroundColor cannot be more than 100 characters',
					],
				},
				textColor: {
					type: String,
					trim: true,
					maxLength: [100, 'textColor cannot be more than 100 characters'],
				},
			},
		],
		icons: [
			{
				name: {
					type: String,
					maxlength: [20, 'Icon name cannot be more than 20 characters.'],
				},
			},
		],
	},
	{
		strictQuery: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
		timestamps: true,
	}
);

categorySchema.pre('save', function () {
	this.slug = slugify(this.name, {
		replacement: '-', // replace spaces with replacement character, defaults to `-`
		remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
		lower: true, // convert to lower case, defaults to `false`
	});
});

export default mongoose.model<ICategory>('Category', categorySchema);
