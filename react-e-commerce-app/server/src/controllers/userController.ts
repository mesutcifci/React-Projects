import type { NextFunction, Request, Response } from 'express';
import catchAsyncErrors from '../helpers/catchAsyncErrors';
import User from '../models/userModel';
import AppError from '../helpers/appError';
import { filterRequestBody } from '../helpers/filterRequestBody';
import { deleteProperties } from '../helpers/deleteObjectProperty';

// export const getAllUsers = catchAsyncErrors(
// 	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
// 		const users = await User.find();
// 		res.status(200).json({
// 			status: 'success',
// 			results: users.length,
// 			data: { users },
// 		});
// 	}
// );

export const getUser = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const user = await User.findById(req.user?.id);

		if (!user) {
			next(new AppError('User not found', 404));
			return;
		}

		// Remove properties which should not to send to client.
		const editedUser = deleteProperties(user.toObject(), [
			'password',
			'passwordConfirm',
			'passwordChangedAt',
			'passwordResetExpires',
			'_id',
			'__v',
		]);

		res.status(200).json({
			status: 'success',
			data: {
				user: editedUser,
			},
		});
	}
);

export const updateProfile = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		let user = await User.findById(req.user?._id);

		if (!user) {
			next(new AppError('User not found', 404));
			return;
		}

		const filteredBody = filterRequestBody(req, ['name', 'surname', 'email']);

		user = await User.findByIdAndUpdate(req.user?.id, filteredBody, {
			runValidators: true,
		});

		res.status(200).json({
			status: 'success',
			data: {
				user,
			},
		});
	}
);

export const deleteAccount = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		await User.findByIdAndUpdate(req.user?.id, { active: false });
		res.status(204).json({ status: 'success', data: null });
	}
);
