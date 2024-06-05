import catchAsyncErrors from '../helpers/catchAsyncErrors';
import type { NextFunction, Request, Response } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import AppError from '../helpers/AppError';
import { deleteProperties } from '../helpers/deleteObjectProperty';

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

		isPasswordCorrect = !!(await user?.comparePasswords(
			password as string,
			user.password
		));

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
