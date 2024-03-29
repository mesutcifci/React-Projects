import { type Request, type Response } from 'express';
import Product from '../models/productModel';
import { type IProduct } from '../types/Product';
import { type FilterQuery } from 'mongoose';

const productLimits = {
	'10': 10,
	'20': 20,
	'30': 30,
};

export const getAllProducts = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const queryObject = { ...req.query };
		let queryString = JSON.stringify(queryObject);
		let sorter = req.query.sort as string;
		let fields = req.query.fields as string;
		let page = 1;
		let limit = 10;
		let skip = 0;

		// We need to convert query object to valid mongoose query strings
		// Example: { price: { gte: 5 } } to { price: {$gte: 5 } }
		queryString = queryString.replace(
			/\b(gte|gt|lte|lt)\b/g,
			(match) => `$${match}`
		);
		const parsedQueryObject: FilterQuery<IProduct> = JSON.parse(queryString);

		// Create query instance
		const query = Product.find(parsedQueryObject);

		// If sort exist in req.query add sort property to query instance
		if (req.query.sort) {
			// Convert invalid 'ratingsAverage,price' to
			// valid mongoose query string ratingsAverage price
			sorter = sorter.split(',').join(' ');
		} else {
			// Sort by created date by default
			sorter = '-createdAt';
		}

		// If field exist in req.query add field property to query instance
		if (fields) {
			// Convert invalid { fields: { 'name,price' } } to
			// valid mongoose query string { fields: { name price} }
			// The query will only returns name and price fields
			fields = fields.split(',').join(' ');
		} else {
			// MongoDB adds this value to documents. We don't need to return it to the clients.
			fields = '-__v';
		}

		// Pagination Start
		if (req.query.page) {
			page = +req.query.page;
		}

		if (req.query.limit) {
			if ((req.query.limit as string) in productLimits) {
				limit = +req.query.limit;
			}
		}

		// If page is 2 and limit is 10 we show only 11th to 21th products
		// So we need to skip first 10 product
		// (page - 1) * limit => (2 - 1) * 10 = 10
		skip = (page - 1) * limit;
		// Pagination End

		if (skip > 0) {
			const productCount = await Product.countDocuments();
			if (skip > productCount) {
				throw new Error('This page is not exist');
			}
		}

		if (sorter) {
			void query.sort(sorter);
		}

		if (fields) {
			void query.select(fields);
		}

		void query.skip(skip).limit(limit);

		// Execute Query
		const products = await query;

		res.status(200).json({
			status: 'success',
			results: products.length,
			data: { products },
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};

export const getProduct = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const product = Product.findById(req.params.id);
		res.status(200).json({
			status: 'success',
			data: { product },
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};

export const createProduct = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const product = await Product.create(req.body);
		res.status(201).json({
			status: 'success',
			data: {
				product,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err,
		});
	}
};

export const updateProduct = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
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
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err,
		});
	}
};

export const deleteProduct = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		await Product.findByIdAndDelete(req.params.id);
		res.status(204).json({ status: 'success' });
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err,
		});
	}
};
