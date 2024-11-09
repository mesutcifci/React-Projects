import express from 'express';
import {
	createAddress,
	deleteAddress,
	getAddresses,
	updateAddress,
} from '../controllers/addressController';

const router = express.Router();

router.route('/').get(getAddresses).post(createAddress);
router.route('/:id').patch(updateAddress).delete(deleteAddress);

export default router;
