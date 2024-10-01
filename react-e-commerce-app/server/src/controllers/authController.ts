import catchAsyncErrors from '../helpers/catchAsyncErrors';
import type { NextFunction, Request, Response } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import AppError from '../helpers/AppError';
import { deleteProperties } from '../helpers/deleteObjectProperty';
import { promisify } from 'util';
import { type IUser } from '../types/user';

const generateToken = (id: string): string =>
	jwt.sign({ id }, process.env.JWT_SECRET as jwt.Secret, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

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
			'favorites',
			'_id',
			'__v',
		]);

		const token = generateToken(user._id as string);

		res.status(201).json({
			status: 'success',
			token,
			data: {
				editedUser,
			},
		});
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
		res.status(200).json({
			status: 'success',
			token,
		});
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

		// convert jwt.verify method to  a promise return function to do not break convention.
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

		console.log('test-1', isPaswordChangedAfterTokenGenerated);

		if (isPaswordChangedAfterTokenGenerated) {
			next(new AppError('Token is invalid. Please log in again.', 401));
			return;
		}

		req.user = user;
		next();
	}
);
