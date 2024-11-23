import express from 'express';
import { addToBasket } from '../controllers/basketController';
import { protect } from '../controllers/authController';

const router = express.Router();

router.route('/').post(protect, addToBasket);

export default router;
