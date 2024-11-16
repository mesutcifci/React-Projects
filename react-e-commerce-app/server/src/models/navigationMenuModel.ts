import mongoose, { Types } from 'mongoose';
import type { INavigationMenu } from '../types/navigationMenu';
import slugify from 'slugify';

const navigationMenuSchema = new mongoose.Schema<INavigationMenu>({
	title: {
		type: String,
		require: [true, 'Title is required'],
		trim: true,
		maxlength: [100, 'Title cannot be more than 100 characters'],
	},
	items: [
		{
			category: {
				type: Types.ObjectId,
				ref: 'Category',
				required: true,
			},
			additionalFields: {
				icon: {
					type: String,
					trim: true,
					lowerCase: true,
					maxlength: [20, 'icon name cannot be more than 20 characters'],
				},
			},
		},
	],
	extraItems: [
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
				maxlength: [100, 'name cannot be more than 100 characters'],
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
});

navigationMenuSchema.pre('save', function () {
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
