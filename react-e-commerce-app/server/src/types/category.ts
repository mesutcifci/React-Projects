import type { Document, Types } from 'mongoose';

export interface ICategory extends Document {
	name: string;
	parentCategory?: Types.ObjectId;
	children?: [Types.ObjectId];
	slug: string;
}
