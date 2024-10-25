import express from 'express';
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUser,
	updateUser,
} from '../controllers/userController';
import {
	forgotPassword,
	login,
	resetPassword,
	signUp,
} from '../controllers/authController';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
