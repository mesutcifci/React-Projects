import { type INestedCategory } from './category';

export interface INavigationMenuExtraItem {
	name: string;
	slug: string;
	order?: number;
	icon?: string;
}

export interface INavigationMenu {
	name: string;
	extraItems: INavigationMenuExtraItem[] | [];
	categories: INestedCategory[];
}
