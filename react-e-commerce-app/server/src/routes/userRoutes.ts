import express from 'express';
import {
	deleteAccount,
	getUser,
	updateProfile,
} from '../controllers/userController';
import {
	forgotPassword,
	login,
	protect,
	resetPassword,
	signUp,
	updatePassword,
} from '../controllers/authController';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const authLimiter = rateLimit({
	limit: 10,
	windowMs: 30 * 60 * 1000,
	message: 'Too many login attempt. Please try again later!',
});

router.post('/signup', authLimiter, signUp);
router.post('/login', authLimiter, login);

router.post('/forgotPassword', authLimiter, forgotPassword);
router.patch('/resetPassword/:token', authLimiter, resetPassword);
router.patch('/updatePassword', authLimiter, protect, updatePassword);

router.patch('/updateProfile', protect, updateProfile);
router.delete('/deleteAccount', protect, deleteAccount);
router.get('/profile', protect, getUser);

export default router;
