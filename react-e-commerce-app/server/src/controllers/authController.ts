import catchAsyncErrors from '../helpers/catchAsyncErrors';
import type { NextFunction, Request, Response } from 'express';
import userModel from '../models/userModel';

export const signUp = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const user = await userModel.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				user,
			},
		});
	}
);
