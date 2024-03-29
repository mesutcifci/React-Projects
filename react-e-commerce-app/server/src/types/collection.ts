import type { Document, Types } from 'mongoose';

export interface ICollection extends Document {
	name: string;
	products: Types.ObjectId;
}
