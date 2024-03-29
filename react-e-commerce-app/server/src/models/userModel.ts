import mongoose from 'mongoose';
import { type IUser } from '../types/user';

const userSchema = new mongoose.Schema<IUser>({
	name: {
		type: String,
		required: [true, 'Name is required'],
		trim: true,
	},
	surname: {
		type: String,
		required: [true, 'Surname is required'],
		trim: true,
	},
	email: {
		type: String,
		required: [true, 'Please provide your email'],
		unique: true,
		lowercase: true,
		trim: true,
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		minlength: 8,
		select: false,
	},
	passwordConfirm: {
		type: String,
		required: [true, 'Please confirm your password'],
	},
	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetExpires: Date,
	active: {
		type: Boolean,
		default: true,
		select: false,
	},
	favorites: [
		{
			type: mongoose.Schema.ObjectId,
			ref: 'Product',
		},
	],
});

export default mongoose.model<IUser>('User', userSchema);
