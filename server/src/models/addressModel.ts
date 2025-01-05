import mongoose from 'mongoose';
import { type IAddress } from '../types/address';

const addressSchema = new mongoose.Schema<IAddress>(
	{
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'Address',
			required: [true, 'User is required'],
		},
		country: {
			type: String,
			required: [true, 'Country is required'],
			trim: true,
			maxlength: [100, 'Country cannot be more than 100 characters'],
		},
		city: {
			type: String,
			required: [true, 'City is required'],
			trim: true,
			maxlength: [100, 'City cannot be more than 100 characters'],
		},
		district: {
			type: String,
			required: [true, 'District is required'],
			trim: true,
			maxlength: [100, 'District cannot be more than 100 characters'],
		},
		neighborhood: {
			type: String,
			required: [true, 'Neighborhood is required'],
			trim: true,
			maxlength: [100, 'Neighborhood cannot be more than 100 characters'],
		},
		addressLineFirst: {
			type: String,
			required: [true, 'Address line is required'],
			trim: true,
			maxlength: [300, 'Address line cannot be more than 300 characters'],
		},
		addressLineSecond: {
			type: String,
			trim: true,
			maxlength: [300, 'Address line cannot be more than 300 characters'],
		},
	},
	{
		/**
		 * #DOC
		 * When strictQuery is enabled, Mongoose ensures that undefined or misspelled fields
		 * in queries don’t accidentally turn the query into an empty filter ({}).
		 * If this happens, an empty filter would match all documents,
		 * leading to unintended results or performance issues.
		 * ---------------------------------------------------------------------------------
		 * DO NOT mix with strict option.
		 * If strict is false, the user can add a field to the db that is not defined in the schema.
		 */
		strictQuery: true,
		/**
		 * #DOC Difference between toJSON and toObject
		 * https://mongoosejs.com/docs/api/document.html#Document.prototype.toJSON()
		 * There is one difference between toJSON() and toObject() options.
		 * When you call toJSON(), the flattenMaps option defaults to true,
		 * because JSON.stringify() doesn't convert maps to objects by default.
		 * When you call toObject(), the flattenMaps option is false by default.
		 */
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

export default mongoose.model<IAddress>('Address', addressSchema);
