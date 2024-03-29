import mongoose from 'mongoose';
import { type ICollection } from '../types/collection';

const collectionSchema = new mongoose.Schema<ICollection>(
	{
		name: {
			type: String,
			required: [true, 'A collection must have a name'],
		},
		products: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'Product',
			},
		],
	},
	{
		strictQuery: true,
	}
);

export default mongoose.model<ICollection>('Collection', collectionSchema);
