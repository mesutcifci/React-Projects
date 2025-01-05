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
			status: 'success',
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
			status: 'success',
			data: {
				address: updatedAddress,
			},
		});
	}
);

export const deleteAddress = catchAsyncErrors(
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

		await Address.findByIdAndDelete(req.params.id);

		res.status(200).json({
			status: 'success',
		});
	}
);

export const getAddresses = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const addresses = await Address.find({
			user: req.user?.id,
		});

		res.status(200).json({
			status: 'success',
			data: {
				addresses,
			},
		});
	}
);

export const getAddress = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const address = await Address.findOne({
			_id: req.params.id,
			user: req.user?.id,
		});

		if (!address) {
			next(new AppError('Address not found', 404));
			return;
		}

		res.status(200).json({
			status: 'success',
			data: {
				address,
			},
		});
	}
);
