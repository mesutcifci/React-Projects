import express from 'express';
import {
	createAddress,
	deleteAddress,
	getAddress,
	getAddresses,
	updateAddress,
} from '../controllers/addressController';

const router = express.Router();

router.route('/').get(getAddresses).post(createAddress);
router.route('/:id').get(getAddress).patch(updateAddress).delete(deleteAddress);

export default router;
