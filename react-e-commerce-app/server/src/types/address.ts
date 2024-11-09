import type { Types } from 'mongoose';

export interface IAddress {
	country: string;
	city: string;
	district: string;
	street: string;
	addressLine1: string;
	addressLine2: string;
	user: Types.ObjectId;
}
