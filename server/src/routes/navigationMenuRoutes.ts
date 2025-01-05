import express from 'express';
import {
	createNavigationMenu,
	getNavigationMenuByName,
} from '../controllers/navigationMenuController';

const router = express.Router();

// TODO comment out before production
router.route('/').post(createNavigationMenu);
router.route('/:name').get(getNavigationMenuByName);

export default router;
