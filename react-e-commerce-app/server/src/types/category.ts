import type { Document, Types } from 'mongoose';

export interface ICategory extends Document {
	name: string;
	parentId?: Types.ObjectId;
	slug: string;
	level: number;
}

// #DOC Omit Mongoose Document type properties but add _id type
export type ICategoryPlain<T = ICategory> = Omit<T, keyof Document> & {
	_id: Types.ObjectId;
};

export interface INestedCategory extends ICategory {
	children: INestedCategory[];
}
