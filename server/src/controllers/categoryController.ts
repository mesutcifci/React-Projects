import { type NextFunction, type Request, type Response } from 'express';
import catchAsyncErrors from '../helpers/catchAsyncErrors';
import Category from '../models/categoryModel';
import AppError from '../helpers/appError';

// TODO remove before production
export const createCategory = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const category = await Category.create(req.body);

		if (!category) {
			next(new AppError('Category could not created', 500));
			return;
		}

		res.status(201).json({
			status: 'success',
			data: {
				category,
			},
		});
	}
);

export const getCategory = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {}
);
