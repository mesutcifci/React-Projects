import express from 'express';
import {
	addToBasket,
	getBasket,
	removeFromBasket,
} from '../controllers/basketController';

const router = express.Router();

router.route('/').get(getBasket).post(addToBasket);
router.route('/remove').patch(removeFromBasket);

export default router;
