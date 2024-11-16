import type { Document, Types } from 'mongoose';

export interface ICategory extends Document {
	name: string;
	parentId?: Types.ObjectId;
	slug: string;
	level: number;
}

export interface INestedCategory extends ICategory {
	children: INestedCategory[];
}
