import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { createHash, randomBytes } from 'crypto';
import { type IUser } from '../types/user';
import validator from 'validator';

const userSchema = new mongoose.Schema<IUser>(
	{
		name: {
			type: String,
			required: [true, 'Name is required'],
			trim: true,
			validate: {
				// This only works on save
				validator: (value: string) => {
					return (
						validator.isAlpha(value, 'tr-TR') ||
						validator.isAlpha(value, 'en-US')
					);
				},
				message:
					'Name must be consist of letters. Please remove numbers and special characters.',
			},
			maxlength: 30,
		},
		surname: {
			type: String,
			required: [true, 'Surname is required'],
			trim: true,
			validate: {
				// This only works on save
				validator: (value: string) => {
					return (
						validator.isAlpha(value, 'tr-TR') ||
						validator.isAlpha(value, 'en-US')
					);
				},
				message:
					'Surname must be consist of letters. Please remove numbers and special characters.',
			},
			maxlength: 30,
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
				// This only works on save
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
	/**
	 * Users may update other user fields ex: email
	 * In this case there is no need to re-encrypt the password
	 */
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 12);
		// Prevents passwordConfirm store in database
		this.passwordConfirm = undefined;
		next();
	} else {
		next();
	}
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password') || this.isNew) {
		next();
		return;
	}

	this.passwordChangedAt = new Date(Date.now() - 1000);
});

userSchema.methods.checkIsPasswordChangedAfterTokenGenerated = async function (
	JWTTimeStamp: string
) {
	if (this.passwordChangedAt) {
		// convert date string to milliseconds
		let convertedTimeStamp = this.passwordChangedAt.getTime();
		// convert to seconds
		convertedTimeStamp /= 1000;

		return JWTTimeStamp < convertedTimeStamp;
	}

	return false;
};

userSchema.methods.comparePasswords = async function (
	input: string,
	currentPassword: string
) {
	return await bcrypt.compare(input, currentPassword);
};

userSchema.methods.createPasswordResetToken = async function () {
	const resetToken = randomBytes(32).toString('hex');
	this.passwordResetToken = createHash('sha256')
		.update(resetToken)
		.digest('hex');
	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
	return resetToken;
};

export default mongoose.model<IUser>('User', userSchema);
