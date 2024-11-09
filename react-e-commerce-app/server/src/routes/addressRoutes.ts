import express from 'express';
import { createAddress } from '../controllers/addressController';

const router = express.Router();

router.route('/').post(createAddress);

export default router;
