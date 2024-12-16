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
	parentId: Types.ObjectId | null;
	slug: string;
	level: number;
	images?: ICategoryImage[];
	icons?: ICategoryIcon[];
}

export interface INestedCategory extends ICategory {
	children: INestedCategory[];
}
