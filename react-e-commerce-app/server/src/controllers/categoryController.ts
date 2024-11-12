import { type NextFunction, type Request, type Response } from 'express';
import catchAsyncErrors from '../helpers/catchAsyncErrors';
import Category from '../models/categoryModel';
import AppError from '../helpers/appError';

export const createCategory = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const category = await Category.create(req.body);

		if (!category) {
			next(new AppError('Category not found', 404));
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
