import express from 'express';
import {
	addToBasket,
	emptyBasket,
	getBasket,
	removeFromBasket,
} from '../controllers/basketController';

const router = express.Router();

router.route('/').get(getBasket).post(addToBasket);
router.route('/remove').patch(removeFromBasket);
router.route('/empty').patch(emptyBasket);

export default router;
