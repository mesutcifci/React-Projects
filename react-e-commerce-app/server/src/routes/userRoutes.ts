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

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updatePassword', protect, updatePassword);

router.patch('/updateProfile', protect, updateProfile);
router.delete('/deleteAccount', protect, deleteAccount);
router.get('/profile', protect, getUser);

export default router;
