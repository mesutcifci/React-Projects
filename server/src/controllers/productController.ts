import type { NextFunction, Request, Response } from 'express';
import Product from '../models/productModel';
import type { IProduct } from '../types/product';
import QueryGenerator from '../helpers/queryGenerator';
import catchAsyncErrors from '../helpers/catchAsyncErrors';
import AppError from '../helpers/appError';
import Category from '../models/categoryModel';
import type QueryString from 'qs';

export const buildQueryForProducts = (
	queryObject: QueryString.ParsedQs
): QueryGenerator<IProduct> => {
	const queryObjectCopy: QueryString.ParsedQs = JSON.parse(
		JSON.stringify(queryObject)
	);
	const resultLimits = {
		'10': '10',
		'20': '20',
		'30': '30',
	};

	const queryInstance = new QueryGenerator(
		/**
		 * #DOC
		 * As soon as we await the Product.find() then the query will be executed
		 * otherwise it will returns a Query object so we can modify this query object without executing
		 */
		Product.find(),
		queryObjectCopy,
		resultLimits
	)
		.filter()
		.search()
		.sort()
		.select()
		.paginate();

	return queryInstance;
};

export const getAllProducts = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const queryInstance = buildQueryForProducts(req.query);
		// Execute Query
		const products = await queryInstance.query;
		res.status(200).json({
			status: 'success',
			results: products.length,
			data: { products },
		});
	}
);

export const getProductsByCategorySlug = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const result = await Category.aggregate([
			{ $match: { slug: req.params.slug } },
			{
				$graphLookup: {
					from: 'categories',
					startWith: '$_id',
					connectFromField: '_id',
					connectToField: 'parentId',
					as: 'descendants',
				},
			},
			{
				$project: {
					categoryIds: {
						$concatArrays: [['$_id'], '$descendants._id'],
					},
				},
			},
		]);

		if (!result.length) {
			next(new AppError('Category not found', 404));
			return;
		}

		// Build query for products
		const queryInstance = buildQueryForProducts({
			...req.query,
			category: { $in: result[0].categoryIds },
		});

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
		const product = await Product.findById(req.params.slug).populate({
			path: 'reviews',
			select: '-__v',
		});

		if (!product) {
			next(new AppError('No product found with that slug', 404));
		}
	}
);

// TODO remove before production
export const createProduct = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const product = await Product.create(req.body);
		res.status(201).json({
			status: 'success',
			data: {
				product,
			},
		});
	}
);

// TODO remove before production
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

// TODO remove before production
export const deleteProduct = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		await Product.findByIdAndDelete(req.params.id);
		res.status(204).json({ status: 'success' });
	}
);
