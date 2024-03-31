import express, { type Express, type ErrorRequestHandler } from 'express';
import productRouter from './routes/productRoutes';
import userRouter from './routes/userRoutes';
import AppError from './helpers/AppError';

// Create express an app instance
const app: Express = express();

// This enables to use of req.body
app.use(express.json());

// Route handlers
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

// 404
app.use('*', (req, res, next) => {
	next(new AppError(`The URL ${req.originalUrl} is not exist`, 404));
});

// Error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	const statusCode: number = err.statusCode || 500;
	const status = err.status || 'error';
	const message = err.message || 'An error occurred!';

	res.status(statusCode).json({
		status,
		message,
	});
};
app.use(errorHandler);

export default app;
