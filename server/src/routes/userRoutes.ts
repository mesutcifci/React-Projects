import express from 'express';
import {
	deleteAccount,
	getFavorites,
	getUser,
	toggleFavorite,
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

// Protect all routes from here
router.use(protect);

router.patch('/updatePassword', authLimiter, updatePassword);
router.patch('/updateProfile', updateProfile);
router.delete('/deleteAccount', deleteAccount);
router.get('/profile', getUser);
router.route('/favorites').get(getFavorites).post(toggleFavorite);

export default router;
