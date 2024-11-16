import type { NextFunction, Request, Response } from 'express';
import Product from '../models/productModel';
import type { IProduct } from '../types/product';
import QueryGenerator from '../helpers/queryGenerator';
import catchAsyncErrors from '../helpers/catchAsyncErrors';
import AppError from '../helpers/appError';
import Category from '../models/categoryModel';
import { type Types } from 'mongoose';
import type QueryString from 'qs';
import { getChildrenCategories } from '../helpers/category';

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
		// find the category by slug
		const category = await Category.findOne({
			slug: req.params.slug,
		});

		if (!category) {
			next(new AppError('Category not found', 404));
			return;
		}

		// Create Set object to avoid duplicated ids
		const uniqueCategoryIdSet = new Set<any>();
		uniqueCategoryIdSet.add(category._id);

		const queryCategory = req?.query?.category_id;
		if (req?.query.category_id) {
			if (Array.isArray(queryCategory)) {
				queryCategory.forEach((item) => {
					uniqueCategoryIdSet.add(item);
				});
			} else {
				uniqueCategoryIdSet.add(queryCategory);
			}
		} else {
			// Get children of the current category
			const children = await getChildrenCategories(
				category._id as Types.ObjectId
			);

			children.forEach((item) => {
				if (item._id) {
					uniqueCategoryIdSet.add(item._id);
				}
			});
		}

		const categoryIdsArray = Array.from(uniqueCategoryIdSet);

		/**
		 * Category A > Category B > Category C
		 *
		 * if req.params.slug: category-a we need to get both products of Category B and Category C.
		 * Because products of these categories also products of Category C
		 */
		const queryObject = {
			...req.query,
			category: { $in: categoryIdsArray },
		};

		// Create query instance
		const queryInstance = buildQueryForProducts(queryObject);

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
			return;
		}

		res.status(200).json({
			status: 'success',
			data: { product },
		});
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
