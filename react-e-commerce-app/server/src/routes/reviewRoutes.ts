import express from 'express';
import { createReview } from '../controllers/reviewController';
import { protect } from '../controllers/authController';

const router = express.Router();

router.route('/').post(protect, createReview);

export default router;
