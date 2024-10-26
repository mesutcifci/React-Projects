import express from 'express';
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUser,
	updateProfile,
	updateUser,
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

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
