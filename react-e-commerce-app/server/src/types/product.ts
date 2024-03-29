export interface IBadge {
	text: string;
	startDate: Date;
	endDate: Date;
}

export interface IProduct {
	name: string;
	price: number;
	discountPrice?: number;
	currency: string;
	stock: number;
	ratingsAverage: number;
	ratingsQuantity: number;
	description: string;
	images: [string];
	badges: [IBadge];
	categoryIds: [string];
	createdAt: Date;
	updatedAt: Date;
}
