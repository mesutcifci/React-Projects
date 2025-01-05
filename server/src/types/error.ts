interface IError {
	message: string;
}

export interface IAppError {
	statusCode: number;
	status: string;
	message: string;
	stack?: string;
	isOperational: boolean;
	errors?: IError[];
	[key: string]: any;
}
