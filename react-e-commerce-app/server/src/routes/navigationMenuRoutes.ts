import express from 'express';
import { createNavigationMenu } from '../controllers/navigationMenuController';

const router = express.Router();

router.route('/').post(createNavigationMenu);

export default router;
