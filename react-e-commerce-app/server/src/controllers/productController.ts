import type { NextFunction, Request, Response } from 'express';
import Product from '../models/productModel';
import type { IProduct } from '../types/product';
import QueryGenerator from '../helpers/queryGenerator';
import catchAsyncErrors from '../helpers/catchAsyncErrors';
import AppError from '../helpers/appError';

export const getAllProducts = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const queryObject = { ...req.query };
		const resultLimits = {
			'10': '10',
			'20': '20',
			'30': '30',
		};
		// Create Query Instance
		const queryInstance = new QueryGenerator(
			Product.find(),
			queryObject,
			resultLimits
		)
			.filter()
			.sort()
			.select()
			.paginate();
		// Execute Query
		const products = await queryInstance.query;
		res.status(200).json({
			status: 'success',
			results: products.length,
			data: { products },
		});
	}
);

export const getProduct = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const product = await Product.findById(req.params.id);

		if (!product) {
			next(new AppError('No product found with that id', 404));
			return;
		}

		res.status(200).json({
			status: 'success',
			data: { product },
		});
	}
);

export const createProduct = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const product = await Product.create(req.body);
		if (!product) {
			next(new AppError('No product found with that id', 404));
			return;
		}
		res.status(201).json({
			status: 'success',
			data: {
				product,
			},
		});
	}
);

export const updateProduct = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const body: IProduct = req.body;
		const product = await Product.findByIdAndUpdate(req.params.id, body, {
			new: true,
			runValidators: true,
		});
		res.status(201).json({
			status: 'success',
			data: {
				product,
			},
		});
	}
);

export const deleteProduct = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const product = await Product.findByIdAndDelete(req.params.id);
		if (!product) {
			next(new AppError('No product found with that id', 404));
			return;
		}
		res.status(204).json({ status: 'success' });
	}
);
