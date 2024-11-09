import type { Document, Types } from 'mongoose';

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
	comparePasswords: (
		candidatePassword: string,
		userPassword: string
	) => Promise<boolean>;
	checkIsPasswordChangedAfterTokenGenerated: (
		timeStamp: string
	) => Promise<boolean>;
	createPasswordResetToken: () => Promise<string>;
}
