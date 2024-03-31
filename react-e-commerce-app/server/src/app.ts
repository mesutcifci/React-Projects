import express, { type Express } from 'express';
import productRouter from './routes/productRoutes';
import userRouter from './routes/userRoutes';

// Create express an app instance
const app: Express = express();

// This enables to use of req.body
app.use(express.json());

// Route handlers
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

// 404
app.use('*', (req, res, next) => {
	res.status(404).json({
		status: 'fail',
		message: `The URL ${req.originalUrl} is not exist`,
	});
});

export default app;
