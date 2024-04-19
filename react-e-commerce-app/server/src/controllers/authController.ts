import catchAsyncErrors from '../helpers/catchAsyncErrors';
import type { NextFunction, Request, Response } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import AppError from '../helpers/AppError';

export const signUp = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const user = await User.create(req.body);

		if (process.env.JWT_SECRET) {
			const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
				expiresIn: process.env.JWT_EXPIRES_IN,
			});

			res.status(201).json({
				status: 'success',
				token,
				data: {
					user,
				},
			});
		} else {
			next('Server Error!');
			// eslint-disable-next-line no-useless-return
			return;
		}
	}
);

export const login = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const { email, password } = req.body;

	if (!email || !password) {
		next(new AppError('Please enter your email and password!', 400));
		return;
	}

	const token = '';
	res.status(200).json({
		status: 'success',
		token,
	});
};
