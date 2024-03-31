export default class AppError extends Error {
	status: string;
	statusCode: number;
	isOperational: boolean;

	constructor(message: string, statusCode: number) {
		super(message);
		this.status = `${statusCode.toString().startsWith('4') ? 'fail' : 'error'}`;
		this.statusCode = statusCode || 500;
		this.message = message || 'An error occurred';
		this.isOperational = true;

		// https://nodejs.org/api/errors.html#errorcapturestacktracetargetobject-constructoropt
		Error.captureStackTrace(this, this.constructor);
	}
}
