import { type NextFunction, type Request, type Response } from 'express';
import { type IAppError } from '../types/error';

const sendErrorToProd = (error: IAppError, res: Response): void => {
	const statusCode: number = error.statusCode || 500;
	const status = error.status || 'error';
	const message = error.message || 'An error occurred!';

	if (error.isOperational) {
		res.status(statusCode).json({
			status,
			message,
		});
	} else {
		res.status(500).json({
			status: 'error',
			message: 'Something went wrong!',
		});
	}
};

const sendErrorToDev = (error: IAppError, res: Response): void => {
	const statusCode: number = error.statusCode || 500;
	const status = error.status || 'error';
	const message = error.message || 'An error occurred!';
	const stack = error.stack;

	res.status(statusCode).json({
		status,
		message,
		stack,
		error,
	});
};

export const errorHandler = (
	error: IAppError,
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	// Restricts error info leaked
	if (process.env.NODE_ENV === 'development') {
		sendErrorToDev(error, res);
	} else if (process.env.NODE_ENV === 'production') {
		sendErrorToProd(error, res);
	}
};
