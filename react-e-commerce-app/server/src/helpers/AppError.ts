export default class AppError extends Error {
	status: string;
	statusCode: number;
	isOperational: boolean;

	constructor(message: string, statusCode: number) {
		super(message);
		this.status = `${statusCode.toString().startsWith('4') ? 'fail' : 'error'}`;
		this.statusCode = statusCode || 500;
		this.message = message || 'An error occurred';
		// In everywhere we use AppError class we mark these errors as safe or operational errors
		this.isOperational = true;

		// https://nodejs.org/api/errors.html#errorcapturestacktracetargetobject-constructoropt
		// Prevents sending sensitive data with error
		Error.captureStackTrace(this, this.constructor);
	}
}
