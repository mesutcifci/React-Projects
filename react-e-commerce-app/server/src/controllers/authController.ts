import catchAsyncErrors from '../helpers/catchAsyncErrors';
import type { NextFunction, Request, Response } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import AppError from '../helpers/appError';
import { deleteProperties } from '../helpers/deleteObjectProperty';
import { promisify } from 'util';
import { type IUser } from '../types/user';
import { sendEmail } from '../helpers/emails';
import { createHash } from 'crypto';

const generateToken = (id: string): string =>
	jwt.sign({ id }, process.env.JWT_SECRET as jwt.Secret, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

const sendToken = (
	token: string,
	statusCode: number,
	res: Response,
	user?: any
): void => {
	const cookieOptions: {
		expires: Date;
		httpOnly: boolean;
		secure?: boolean;
	} = {
		expires: new Date(
			Date.now() +
				Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};

	// Make sure to do not send password accidentally
	if (user?.password) {
		user.password = undefined;
	}

	if (process.env.NODE_ENV === 'production') {
		cookieOptions.secure = true;
	}

	res.cookie('jwt', token, cookieOptions);

	res.status(statusCode).json({
		status: 'success',
		token,
		...(user && { data: { user } }),
	});
};

export const signUp = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const user = await User.create({
			name: req.body.name,
			surname: req.body.surname,
			email: req.body.email,
			password: req.body.password,
			passwordConfirm: req.body.passwordConfirm,
			passwordChangedAt: req.body.passwordChangedAt,
		});

		// Remove properties which should not to send to client.
		const editedUser = deleteProperties(user.toObject(), [
			'password',
			'passwordConfirm',
			'passwordChangedAt',
			'passwordResetExpires',
			'favorites',
			'_id',
			'__v',
		]);

		const token = generateToken(user._id as string);

		sendToken(token, 201, res, editedUser);
	}
);

export const login = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const { email, password } = req.body;

		if (!email || !password) {
			next(new AppError('Please enter your email and password!', 400));
			return;
		}

		const user = await User.findOne({ email }).select('+password');
		let isPasswordCorrect = false;

		if (user) {
			isPasswordCorrect = await user.comparePasswords(
				password as string,
				user.password
			);
		}

		if (!user || !isPasswordCorrect) {
			next(new AppError('Your Email Or Password Is Not Correct', 401));
			return;
		}

		const token = generateToken(user._id as string);
		sendToken(token, 200, res);
	}
);

interface CustomRequest extends Request {
	user?: IUser;
}

export const protect = catchAsyncErrors(
	async (req: CustomRequest, res: Response, next: NextFunction) => {
		let token;

		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			token = req.headers.authorization.split(' ')[1];
		}

		if (!token) {
			next(
				new AppError('You are not logged in. Please log in to continue.', 401)
			);
			return;
		}

		if (!process.env.JWT_SECRET) {
			next(new AppError('Server error. Cannot access to the jwt', 500, false));
			return;
		}

		// Normally jwt.verify accepts a callback function runs as soon as verification completed
		// We are converting jwt.verify method to a promise return function to do not break convention.
		// So we can stick to async await
		const promisifiedVerify = promisify(jwt.verify) as (
			// ts does not know if how many parameters accept promisifiedVerify function
			// we need to declare manually
			token: string,
			secret: string
		) => Promise<any>;
		const decoded = await promisifiedVerify(token, process.env.JWT_SECRET);

		const user = await User.findById(decoded.id);

		if (!user) {
			next(new AppError('User not found with this token', 401));
			return;
		}

		const isPaswordChangedAfterTokenGenerated =
			await user.checkIsPasswordChangedAfterTokenGenerated(
				decoded.iat as string
			);

		if (isPaswordChangedAfterTokenGenerated) {
			next(new AppError('Token is invalid. Please log in again.', 401));
			return;
		}

		req.user = user;
		next();
	}
);

export const forgotPassword = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const user = await User.findOne({ email: req.body.email });

		if (!user) {
			next(new AppError('There is no user with this email address!', 404));
			return;
		}

		const resetToken = await user.createPasswordResetToken();
		await user.save({ validateBeforeSave: false });

		const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;

		const message = `Reset URL: ${resetURL}`;

		try {
			await sendEmail({
				email: user.email,
				subject: 'Reset Your Password',
				message,
			});

			res.status(200).json({
				status: 'success',
				message: 'Token send to your email successfully',
			});
		} catch (error) {
			user.passwordResetExpires = undefined;
			user.passwordResetToken = undefined;
			await user.save({ validateBeforeSave: false });
			next(new AppError('An error occurred. Try again later!', 500));
			// eslint-disable-next-line no-useless-return
			return;
		}
	}
);

export const resetPassword = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const passwordResetToken = createHash('sha256')
			.update(req.params.token)
			.digest('hex');

		const user = await User.findOne({
			passwordResetToken,
			passwordResetExpires: {
				$gt: Date.now(),
			},
		});

		if (!user) {
			next(new AppError('Token is invalid or expired!', 400));
			return;
		}

		user.password = req.body.password;
		user.passwordConfirm = req.body.passwordConfirm;
		user.passwordResetToken = req.body.passwordResetToken;
		await user.save();

		const token = generateToken(user._id as string);
		sendToken(token, 200, res);
	}
);

export const updatePassword = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const user = await User.findById(req.user?.id).select('+password');

		let isPasswordCorrect = false;

		if (user) {
			isPasswordCorrect = await user.comparePasswords(
				req.body.passwordCurrent as string,
				user.password
			);
		}

		if (!user || !isPasswordCorrect) {
			next(new AppError('Your Current Password Is Not Correct', 401));
			return;
		}

		user.password = req.body.password;
		user.passwordConfirm = req.body.passwordConfirm;
		await user.save();

		const token = generateToken(user._id as string);
		sendToken(token, 200, res);
	}
);
