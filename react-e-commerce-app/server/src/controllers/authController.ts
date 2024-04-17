import catchAsyncErrors from '../helpers/catchAsyncErrors';
import type { NextFunction, Request, Response } from 'express';
import userModel from '../models/userModel';
import jwt from 'jsonwebtoken';

export const signUp = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const user = await userModel.create(req.body);

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
		}
	}
);
