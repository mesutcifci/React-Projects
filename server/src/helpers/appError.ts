/***
 * These class responsible for creating errors with message and statusCode parameters
 * and avoid code duplication.
 *
 * If these classes wouldn't exist, we would write code like following every time we want to send error
 *
 * ```
 * const err = new Error('Error message')
 * err.status = 'fail';
 * err.statusCode = 404;
 * next(err)
 * ```
 *
 * Instead we write code like that
 *
 * next(new AppError('Error message', 404));
 *
 */

export default class AppError extends Error {
	status: string;
	statusCode: number;
	isOperational: boolean;

	constructor(message: string, statusCode: number, isOperational = true) {
		super(message);
		this.status = `${statusCode.toString().startsWith('4') ? 'fail' : 'error'}`;
		this.statusCode = statusCode || 500;
		this.message = message || 'An error occurred';
		// In everywhere we use AppError class we mark these errors as safe or operational errors
		this.isOperational = isOperational;

		// https://nodejs.org/api/errors.html#errorcapturestacktracetargetobject-constructoropt
		// Prevents sending sensitive data with error
		Error.captureStackTrace(this, this.constructor);
	}
}
