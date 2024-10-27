import express, { type Express } from 'express';
import productRouter from './routes/productRoutes';
import userRouter from './routes/userRoutes';
import AppError from './helpers/appError';
import { errorHandler } from './controllers/errorController';
import rateLimit from 'express-rate-limit';

// Create express an app instance
const app: Express = express();

// Rate limit
const limiter = rateLimit({
	limit: 300,
	windowMs: 60 * 60 * 1000,
	message: 'Too many request from this IP, please try again in an hour!',
});

const userLimiter = rateLimit({
	limit: 30,
	windowMs: 30 * 60 * 1000,
	message: 'Too many attempt. Please try again later!',
});

// This enables to use of req.body
app.use(express.json());

// Route handlers
app.use('/api/v1/products', limiter, productRouter);
app.use('/api/v1/users', userLimiter, userRouter);

// Handle routes that are not exist
app.use('*', (req, res, next) => {
	next(new AppError(`The URL ${req.originalUrl} is not exist`, 404));
});

/**
 * Error handler middleware
 * This middleware catches all of errors. Because errorHandler function takes four arguments
 * express register this function as an error handler middleware
 *
 * When we pass our error objects (new AppError(...)) into next function
 * express regards these as an error by default. Then the error middleware catches these errors.
 */
app.use(errorHandler);

export default app;
