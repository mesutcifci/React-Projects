import express from 'express';
import { createCategory, getCategory } from '../controllers/categoryController';
import { protect } from '../controllers/authController';

const router = express.Router();

// TODO keep only get request after production
router.route('/').post(protect, createCategory);

router.route('/:id').get(getCategory);

export default router;
