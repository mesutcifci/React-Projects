import type { NextFunction, Request, Response } from 'express';
import catchAsyncErrors from '../helpers/catchAsyncErrors';
import User from '../models/userModel';

export const getAllUsers = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const users = await User.find();
		res.status(200).json({
			status: 'success',
			results: users.length,
			data: { users },
		});
	}
);

export const getUser = (req: Request, res: Response): void => {
	console.log(req.params);
	res.status(200).json({ message: 'User Fetched With Id' });
};

export const createUser = (req: Request, res: Response): void => {
	console.log(req.body);
	res.status(200).json({ message: 'User Successfully Created' });
};

export const updateUser = (req: Request, res: Response): void => {
	res.status(200).json({ message: 'User Successfully Updated' });
};

export const deleteUser = (req: Request, res: Response): void => {
	res.status(204).json({ message: 'User Successfully Deleted' });
};
