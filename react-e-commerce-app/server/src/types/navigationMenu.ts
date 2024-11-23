import type { Document } from 'mongoose';

// Base interfaces
interface IBase {
	name: string;
	extraItems: INavigationMenuExtraItem[] | [];
}

export interface INavigationMenuItem<T> {
	category: T;
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

export type INavigationMenu<
	TCategory,
	IsDocument extends boolean = false,
> = IBase &
	(IsDocument extends true ? Document : Record<string, unknown>) & {
		items: Array<INavigationMenuItem<TCategory>>;
	};
