import { type NextFunction, type Request, type Response } from 'express';

export const errorHandler = (
	err: { statusCode: number; status: string; message: string },
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const statusCode: number = err.statusCode || 500;
	const status = err.status || 'error';
	const message = err.message || 'An error occurred!';

	res.status(statusCode).json({
		status,
		message,
	});
};
