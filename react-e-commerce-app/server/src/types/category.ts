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

interface ICategoryAncestor {
	categoryId: Types.ObjectId;
	name: string;
	slug: string;
	depth: number;
}

export interface ICategory extends Document {
	name: string;
	parentId: Types.ObjectId | null;
	slug: string;
	depth: number;
	images?: ICategoryImage[];
	icons?: ICategoryIcon[];
	ancestor: ICategoryAncestor[] | null;
}

export interface INestedCategory extends ICategory {
	children: INestedCategory[];
}
