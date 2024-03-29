import { type Request, type Response } from 'express';
import Product from '../models/productModel';
import { type IProduct } from '../types/Product';

export const getAllProducts = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const products = await Product.find();
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
		console.log(err);
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
