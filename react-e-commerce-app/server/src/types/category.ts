import type { Document, Types } from 'mongoose';

interface ICategoryImage {
	url: string;
	link: string;
	text: string;
	textColor: string;
	backgroundColor: string;
}

interface ICategoryIcon {
	name: string;
}

export interface ICategory extends Document {
	name: string;
	parentId?: Types.ObjectId;
	slug: string;
	level: number;
	images?: ICategoryImage[];
	icons?: ICategoryIcon[];
}

/**
 * #DOC
 * At ICategoryPlain type we don't need Mongoose Document type fields but id
 * So this code creates a type with fields T and _id field while omitting Mongoose Document type properties
 */
export type ICategoryPlain<T = ICategory> = Omit<T, keyof Document> & {
	_id: Types.ObjectId;
};

export interface INestedCategory extends ICategory {
	children: INestedCategory[];
}
