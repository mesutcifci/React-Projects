import express from 'express';
import {
	createAddress,
	deleteAddress,
	updateAddress,
} from '../controllers/addressController';

const router = express.Router();

router.route('/').post(createAddress);
router.route('/:id').patch(updateAddress).delete(deleteAddress);

export default router;
