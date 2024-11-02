import { type NextFunction, type Request, type Response } from 'express';
import catchAsyncErrors from '../helpers/catchAsyncErrors';
import ReviewModel from '../models/reviewModel';

export const createReview = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const review = await ReviewModel.create(req.body);

		res.status(200).json({
			status: 'success',
			data: {
				review,
			},
		});
	}
);
