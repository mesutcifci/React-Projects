import express from 'express';
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProduct,
	updateProduct,
} from '../controllers/productController';
import reviewRouter from '../routes/reviewRoutes';

const router = express.Router();

// Use review touter instead of product router for this url
// We implement this here because we want to get product id from current product
router.use('/:productId/reviews', reviewRouter);

// TODO remove createProduct before production
router.route('/').get(getAllProducts).post(createProduct);

// TODO remove updateProduct and deleteProduct before production
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct);

export default router;
