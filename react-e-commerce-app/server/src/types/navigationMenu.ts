import { type Document } from 'mongoose';

export interface INavigationMenuItem<T> {
	category: T;
}

export interface INavigationMenuExtraItem {
	name: string;
	slug: string;
	order?: number;
	icon?: string;
}

/**
 * We use INavigationMenu interface is two main places
 * 1)The Navigation Menu Model
 * 	 In the navigation menu model we set the category field to ObjectId because
 *   we need only the category id at creation. We after populate the category fields.
 * 2) The Navigation Menu Controller
 *   In the controller we use the like that INavigationMenu<ICategoryPlain> because
 *   this time category field have its other attributes name, slug etc
 */
export type INavigationMenu<
	TCategory,
	IsDocument extends boolean = false,
> = (IsDocument extends true ? Document : Record<string, unknown>) & {
	name: string;
	extraItems: INavigationMenuExtraItem[] | [];
	items: Array<INavigationMenuItem<TCategory>>;
};
