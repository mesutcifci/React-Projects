import { type NextFunction, type Request, type Response } from 'express';
import catchAsyncErrors from '../helpers/catchAsyncErrors';
import AppError from '../helpers/appError';
import Basket from '../models/basketModel';
import Product from '../models/productModel';

export const addToBasket = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { productId, quantity } = req.body;

		// Check the quantity value, if quantity less than 1, throw an error
		if (quantity <= 0) {
			next(new AppError('Quantity cannot be less than 1', 400));
			return;
		}

		// Check if productId exist
		if (!productId) {
			next(new AppError('Product id not exist', 400));
			return;
		}

		// Check if productId is valid
		const product = await Product.findById(productId);

		if (!product) {
			next(new AppError('Cannot find a product with this product id', 404));
			return;
		}

		// if quantity bigger than product stock throw error
		if (quantity > product.stock) {
			next(
				new AppError(
					`Quantity(${quantity}) cannot be more than product stock(${product.stock})`,
					400
				)
			);
			return;
		}

		// Get basket with req user id
		let basket = await Basket.findOne({
			user: req.user?._id,
		});

		// if basket exist update basket
		if (basket) {
			// Find product with productId comes from req.body
			// Convert values to string to ensure passing reference checking
			const basketProduct = basket.products?.find(
				(item) => item.product?.toString() === productId
			);

			// if product exist update the quantity value of the product
			if (basketProduct) {
				basketProduct.quantity = quantity;
			}
			// else add new product
			else {
				const newProduct = {
					quantity,
					product: productId,
				};
				basket.products.push(newProduct);
			}

			await basket.save();
		}
		// else create new basket
		else {
			basket = await Basket.create({
				user: req.user?._id,
				products: [
					{
						product: productId,
						quantity,
					},
				],
			});

			if (!basket) {
				next(new AppError('Basket could not be created', 500));
				return;
			}
		}

		res.status(200).json({
			status: 'success',
			data: {
				basket,
			},
		});
	}
);

export const getBasket = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const basket = await Basket.findOne({
			user: req.user?._id,
		});

		if (!basket) {
			next(new AppError('Basket not found', 404));
			return;
		}

		res.status(200).json({
			status: 'success',
			data: {
				basket,
			},
		});
	}
);

export const removeFromBasket = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { productId } = req.body;

		if (!productId) {
			next(new AppError('Product id not found', 400));
			return;
		}

		// Get basket of the user
		const basket = await Basket.findOne({ user: req.user?._id });

		// if not basket throw error
		if (!basket) {
			next(new AppError('Basket not found', 404));
			return;
		}

		// if not basket products throw error
		if (!basket.products?.length) {
			next(new AppError('Basket products not found', 404));
			return;
		}

		// Find index of product id inside of basket products
		const index = basket.products.findIndex(
			(item) => item.product?.toString() === productId?.toString()
		);

		// if index == -1 throw error product not found
		if (index === -1) {
			next(new AppError('Could not find a product with this id', 404));
			return;
		}
		// else remove the product
		else {
			basket.products.splice(index, 1);
			await basket.save();
		}

		res.status(200).json({
			status: 'success',
			data: {
				basket,
			},
		});
	}
);

export const emptyBasket = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		// Get basket of the user
		const basket = await Basket.findOne({ user: req.user?._id });

		// if not basket throw error
		if (!basket) {
			next(new AppError('Basket not found', 404));
			return;
		}

		// Equate basket products to an empty array
		basket.products = [];
		await basket.save();

		res.status(200).json({
			status: 'success',
			data: {
				basket,
			},
		});
	}
);
