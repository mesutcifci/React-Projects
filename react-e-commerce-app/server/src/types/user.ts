import type { Document, Types } from 'mongoose';

export interface IFavorite {
	ref: 'Product';
}

interface IAddress {
	country: string;
	city: string;
	district: string;
	street: string;
	addressLine1: string;
	addressLine2: string;
}

export interface IUser extends Document {
	name: string;
	surname: string;
	email: string;
	password: string;
	passwordConfirm?: string;
	passwordChangedAt?: Date;
	passwordResetToken?: string;
	passwordResetExpires?: Date;
	active: boolean;
	favorites: Types.ObjectId[];
	address?: IAddress;
	comparePasswords: (
		candidatePassword: string,
		userPassword: string
	) => Promise<boolean>;
	checkIsPasswordChangedAfterTokenGenerated: (
		timeStamp: string
	) => Promise<boolean>;
	createPasswordResetToken: () => Promise<string>;
}
