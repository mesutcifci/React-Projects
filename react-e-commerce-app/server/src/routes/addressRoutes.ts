import express from 'express';
import { createAddress, updateAddress } from '../controllers/addressController';

const router = express.Router();

router.route('/').post(createAddress);
router.route('/:id').patch(updateAddress);

export default router;
