import express from 'express';
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProduct,
	updateProduct,
} from '../controllers/productController';

const router = express.Router();

router.route('/').get(getAllProducts).post(createProduct);

router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct);

export default router;
