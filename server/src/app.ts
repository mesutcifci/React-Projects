import express, { type Express } from 'express';

import productRouter from './routes/productRoutes';
import userRouter from './routes/userRoutes';
import reviewRouter from './routes/reviewRoutes';
import addressRouter from './routes/addressRoutes';
import categoryRouter from './routes/categoryRoutes';
import navigationRouter from './routes/navigationMenuRoutes';
import basketRouter from './routes/basketRoutes';

import AppError from './helpers/appError';
import { errorHandler } from './controllers/errorController';
import { protect } from './controllers/authController';

import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import sanitizeHtml from 'sanitize-html';
import cors from 'cors';
import { whiteList } from './whitelist';

const sanitizeRecursively = (data: any): any => {
	if (typeof data === 'string') {
		return sanitizeHtml(data, {
			allowedTags: ['b', 'i', 'em', 'strong', 'a'],
			allowedAttributes: {
				a: ['href'],
			},
			allowedIframeHostnames: ['www.youtube.com'],
		});
	} else if (Array.isArray(data)) {
		// Recursively sanitize each item in the array
		return data.map((item) => sanitizeRecursively(item));
	} else if (typeof data === 'object' && data !== null) {
		// Recursively sanitize each property in the object
		const sanitizedObject: any = {};
		for (const key in data) {
			sanitizedObject[key] = sanitizeRecursively(data[key]);
		}
		return sanitizedObject;
	} else if (typeof data === 'boolean' || typeof data === 'number') {
		return data; // Booleans and numbers don't need sanitization
	}
};

// Create express an app instance
const app: Express = express();

app.use(
	cors({
		origin: function (origin, callback) {
			if (origin && whiteList.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
	})
);

// Set http security headers
app.use(helmet());

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

app.use('/api', limiter);

// This enables to use of req.body
app.use(express.json());

// Data sanitization for NoSQL attacks
app.use(ExpressMongoSanitize());

app.use((req, res, next) => {
	sanitizeRecursively(req.body);
	next();
});

// Route handlers
app.use('/api/v1/users', userLimiter, userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/address', protect, addressRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/navigation', navigationRouter);
app.use('/api/v1/basket', protect, basketRouter);

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
