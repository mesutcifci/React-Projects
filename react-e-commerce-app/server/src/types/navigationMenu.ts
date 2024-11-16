import type { Document, Types } from 'mongoose';

export interface INavigationMenuItem {
	category: Types.ObjectId;
	additionalFields: {
		icon: string;
	};
}

export interface INavigationMenuExtraItem {
	name: string;
	slug: string;
	order?: number;
	icon?: string;
}

export interface INavigationMenu extends Document {
	title: string;
	items: INavigationMenuItem[];
	extraItems: INavigationMenuExtraItem[];
}
