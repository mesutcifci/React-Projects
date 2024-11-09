import { type NextFunction, type Request, type Response } from 'express';
import catchAsyncErrors from '../helpers/catchAsyncErrors';
import ReviewModel from '../models/reviewModel';
import AppError from '../helpers/appError';
import { type IReview } from '../types/review';

export const getReviewsOfProduct = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const reviews = await ReviewModel.find({
			product: req.params.productId,
		});

		res.status(200).json({
			status: 'success',
			data: {
				reviews,
			},
		});
	}
);

export const createReview = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		if (!req.body.product) {
			req.body.product = req.params.productId;
		}

		// Comes from protect middleware
		req.body.user = req.user?.id;

		const review = await ReviewModel.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				review,
			},
		});
	}
);

export const updateReview = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const review = await ReviewModel.findById(req.params.id);
		if (!review) {
			next(new AppError('Review not found!', 404));
			return;
		}

		// Prevents a user from trying to update another user's review
		if (!review.user || review.user.toString() !== req?.user?.id) {
			next(new AppError('Insufficient permission', 401));
			return;
		}

		const updatedReview = await ReviewModel.findByIdAndUpdate(
			req.params.id,
			req.body as IReview,
			{
				runValidators: true,
				new: true,
			}
		);

		res.status(200).json({
			status: 'success',
			data: {
				review: updatedReview,
			},
		});
	}
);
