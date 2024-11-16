import express from 'express';
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProduct,
	getProductsByCategorySlug,
	updateProduct,
} from '../controllers/productController';
import reviewRouter from '../routes/reviewRoutes';

const router = express.Router();

// Use review router instead of product router for this url
// We implement this here because we want to get product id from current product
router.use('/:productId/reviews', reviewRouter);

// TODO remove createProduct before production
router.route('/').get(getAllProducts).post(createProduct);

router.route('/category/:slug').get(getProductsByCategorySlug);

// TODO remove updateProduct and deleteProduct before production
router
	.route('/:slug')
	.get(getProduct)
	.patch(updateProduct)
	.delete(deleteProduct);

export default router;
