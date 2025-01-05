import mongoose from 'mongoose';
import type { INavigationMenu } from '../types/navigationMenu';
import slugify from 'slugify';

const navigationMenuSchema = new mongoose.Schema<INavigationMenu>(
	{
		name: {
			type: String,
			require: [true, 'Name is required'],
			trim: true,
			maxlength: [100, 'Name cannot be more than 100 characters'],
			unique: true,
			lowercase: true,
		},
		extraItems: {
			type: [
				{
					name: {
						type: String,
						trim: true,
						lowerCase: true,
						maxlength: [100, 'name cannot be more than 100 characters'],
						required: true,
					},
					slug: {
						type: String,
						trim: true,
						maxlength: [100, 'slug cannot be more than 100 characters'],
					},
					order: {
						type: Number,
						max: [100, 'order number cannot be more than 100'],
						min: [-9999, 'order number cannot be less than -9999'],
					},
					icon: {
						type: String,
						trim: true,
						lowerCase: true,
						maxlength: [20, 'icon name cannot be more than 20 characters'],
					},
				},
			],
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		strictQuery: true,
	}
);

navigationMenuSchema.pre('save', function () {
	if (this?.name) {
		this.name = slugify(this.name, { lower: true });
	}

	if (this?.extraItems?.length > 0) {
		this.extraItems.forEach((item) => {
			item.slug = slugify(item.name, { lower: true });
		});
	}
});

export default mongoose.model<INavigationMenu>(
	'NavigationMenu',
	navigationMenuSchema
);
