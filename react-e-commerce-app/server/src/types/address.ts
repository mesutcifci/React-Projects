import type { Types } from 'mongoose';

export interface IAddress {
	country: string;
	city: string;
	district: string;
	neighborhood: string;
	addressLineFirst: string;
	addressLineSecond: string;
	user: Types.ObjectId;
}
