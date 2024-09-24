export interface IAppError {
	statusCode: number;
	status: string;
	message: string;
	stack?: string;
	isOperational: boolean;
	name?: string;
	code?: number;
}
