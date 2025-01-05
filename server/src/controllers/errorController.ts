import { type NextFunction, type Request, type Response } from 'express';
import { type IAppError } from '../types/error';
import { type CastError } from 'mongoose';
import AppError from '../helpers/appError';

const handleCastError = (error: CastError): IAppError => {
	const message = `Invalid ${error.path}: ${error.value}`;

	return new AppError(message, 400) as IAppError;
};

const handleDBDuplicateFieldError = (error: IAppError): IAppError => {
	// extract value between quotas
	const extractedErrorMessage = error.message.match(/"([^"]+)"/); // Correct usage of regex

	const message = `Duplicate value ${extractedErrorMessage?.[1] ?? ''}. Please use a different value.`;
	return new AppError(message, 400);
};

const handleDBValidationError = (error: IAppError): IAppError => {
	const validationErrors = error?.errors;
	if (validationErrors) {
		const messages = Object.values(validationErrors).map(
			(item) => item.message
		);

		const message = `Invalid input data. ${messages.join('. ')}`;
		return new AppError(message, 400);
	}

	return new AppError('Invalid input data.', 400);
};

const handleJWTError = (): IAppError =>
	new AppError('Invalid token. Please log in', 401);

const handleJWTExpiredError = (): IAppError =>
	new AppError('Your token has expired. Please log in again', 401);

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
		let copyError: Record<string, any> = {};

		// clone not enumerable properties
		// https://stackoverflow.com/a/38316932
		Object.getOwnPropertyNames(error).forEach(function (prop) {
			copyError[prop] = error[prop];
		});

		if (error.name === 'CastError') {
			copyError = handleCastError(error as unknown as CastError);
		} else if (error.code === 11000) {
			copyError = handleDBDuplicateFieldError(error);
		} else if (error.name === 'ValidationError') {
			copyError = handleDBValidationError(error);
		} else if (error.name === 'JsonWebTokenError') {
			copyError = handleJWTError();
		} else if (error.name === 'TokenExpiredError') {
			copyError = handleJWTExpiredError();
		}

		sendErrorToProd(copyError as IAppError, res);
	}
};
