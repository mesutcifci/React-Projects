import { type NextFunction, type Request, type Response } from 'express';
import { type IAppError } from '../types/error';
import { type CastError } from 'mongoose';
import AppError from '../helpers/AppError';

const handleCastError = (error: CastError): IAppError => {
	const message = `Invalid ${error.path}: ${error.value}`;

	return new AppError(message, 400) as IAppError;
};

const sendErrorToProd = (error: IAppError, res: Response): void => {
	const statusCode: number = error.statusCode || 500;
	const status = error.status || 'error';
	const message = error.message || 'An error occurred!';

	// Operational, trusted error: send message to client
	if (error.isOperational) {
		res.status(statusCode).json({
			status,
			message,
		});

		// Programming, unknown, not to safe to send to client: send generic message don't leak any information
	} else {
		console.error('!!!ERROR!!!: ', error);

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
		let copyError = { ...error };
		if (error.name === 'CastError') {
			copyError = handleCastError(error as unknown as CastError);
		}

		sendErrorToProd(copyError, res);
	}
};
