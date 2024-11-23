import { type NextFunction, type Request, type Response } from 'express';
import catchAsyncErrors from '../helpers/catchAsyncErrors';
import Category from '../models/categoryModel';
import AppError from '../helpers/appError';
import { generateNestedCategory, getCategoryPath } from '../helpers/category';

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
	async (req: Request, res: Response, next: NextFunction) => {
		const categoryPath = await getCategoryPath(req.params.id);

		if (!categoryPath) {
			next(new AppError('Category not found', 404));
			return;
		}

		const nestedCategory = generateNestedCategory(categoryPath);

		if (!nestedCategory) {
			next(new AppError('Could not create nested category object', 500));
			return;
		}

		res.status(200).json({
			status: 'success',
			data: {
				category: nestedCategory,
			},
		});
	}
);
