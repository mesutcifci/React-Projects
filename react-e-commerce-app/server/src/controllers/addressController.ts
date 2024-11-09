import { type NextFunction, type Request, type Response } from 'express';
import catchAsyncErrors from '../helpers/catchAsyncErrors';
import Address from '../models/addressModel';

export const createAddress = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const addressBody = JSON.parse(JSON.stringify(req.body));
		addressBody.user = req.user?.id;

		const address = await Address.create(addressBody);

		res.status(201).json({
			data: {
				address,
			},
		});
	}
);
