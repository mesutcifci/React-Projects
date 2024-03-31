import type { Request, Response } from 'express';
import Product from '../models/productModel';
import type { IProduct } from '../types/product';
import QueryGenerator from '../helpers/QueryGenerator';

export const getAllProducts = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
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
