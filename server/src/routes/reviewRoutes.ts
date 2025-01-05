import express from 'express';
import {
	createReview,
	getReviewsOfProduct,
	updateReview,
} from '../controllers/reviewController';
import { protect } from '../controllers/authController';

/**
 * Each router only have access parameters of their routers
 * if we need to reach other routes' parameters
 * we need to set mergeParams value to true
 */
const router = express.Router({ mergeParams: true });

router.route('/').get(getReviewsOfProduct).post(protect, createReview);

router.route('/:id').patch(protect, updateReview);

export default router;
