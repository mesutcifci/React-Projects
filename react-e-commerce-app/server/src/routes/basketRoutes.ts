import express from 'express';
import { addToBasket, getBasket } from '../controllers/basketController';

const router = express.Router();

router.route('/').get(getBasket).post(addToBasket);

export default router;
