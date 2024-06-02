import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { type IUser } from '../types/user';
import validator from 'validator';

const userSchema = new mongoose.Schema<IUser>(
	{
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
			validate: [validator.isEmail, 'Please provide a valid email'],
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
			validate: {
				validator: function (data: string): boolean {
					return data === (this as unknown as IUser).password;
				},
				message: "Passwords don't match",
			},
			select: false,
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
	},
	{
		strictQuery: true,
	}
);

// NOTE: Never write your own logic for authentication and authorization for production app
// Use 3rd party solutions like Auth0 instead
userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 12);
		// Prevents passwordConfirm store in database
		this.passwordConfirm = undefined;
		next();
	} else {
		next();
	}
});

userSchema.methods.comparePasswords = async function (
	currentPassword: string,
	input: string
) {
	const isPasswordMatched = await bcrypt.compare(input, currentPassword);
	return isPasswordMatched;
};

export default mongoose.model<IUser>('User', userSchema);
