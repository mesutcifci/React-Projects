import { type NextFunction, type Request, type Response } from 'express';
import catchAsyncErrors from '../helpers/catchAsyncErrors';
import ReviewModel from '../models/reviewModel';

export const createReview = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		if (!req.body.product) {
			req.body.product = req.params.productId;
		}

		// Comes from protect middleware
		req.body.user = req.user?.id;

		const review = await ReviewModel.create(req.body);

		res.status(200).json({
			status: 'success',
			data: {
				review,
			},
		});
	}
);
