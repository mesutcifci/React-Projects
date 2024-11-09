import { type NextFunction, type Request, type Response } from 'express';
import catchAsyncErrors from '../helpers/catchAsyncErrors';
import Address from '../models/addressModel';
import AppError from '../helpers/appError';
import { type IAddress } from '../types/address';

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

export const updateAddress = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const address = await Address.findById(req.params.id);

		if (!address) {
			next(new AppError('Address not found', 404));
			return;
		}

		if (address.user.toString() !== req.user?.id) {
			next(new AppError('Insufficient permission', 401));
			return;
		}

		const addressBody = JSON.parse(JSON.stringify(req.body));
		addressBody.user = req.user?.id;
		const updatedAddress = await Address.findByIdAndUpdate(
			req.params.id,
			addressBody as IAddress,
			{
				// #DOC returns updated document
				new: true,
				runValidators: true,
			}
		);

		res.status(200).json({
			data: {
				address: updatedAddress,
			},
		});
	}
);
