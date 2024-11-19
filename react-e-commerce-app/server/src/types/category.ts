import type { Document, Types } from 'mongoose';

export interface ICategory extends Document {
	name: string;
	parentId?: Types.ObjectId;
	slug: string;
	level: number;
}

// Use for responses. Omit Mongoose Document type properties
export type ICategoryPlain = Omit<ICategory, keyof Document>;

export interface INestedCategory extends ICategory {
	children: INestedCategory[];
}
