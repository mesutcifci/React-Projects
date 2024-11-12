import type { Document, Types } from 'mongoose';

export interface ICategory extends Document {
	name: string;
	value: string;
	parentId?: Types.ObjectId;
	slug: string;
	level: number;
}
