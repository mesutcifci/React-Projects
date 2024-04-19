import express from 'express';
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUser,
	updateUser,
} from '../controllers/userController';
import { login, signUp } from '../controllers/authController';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
