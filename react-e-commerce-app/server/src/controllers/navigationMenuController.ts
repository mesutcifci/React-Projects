import type { NextFunction, Request, Response } from 'express';
import catchAsyncErrors from '../helpers/catchAsyncErrors';
import NavigationMenu from '../models/navigationMenuModel';

// TODO comment out before production
export const createNavigationMenu = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { title, items, extraItems } = req.body;

		const menu = await NavigationMenu.create({ title, items, extraItems });

		res.status(201).json({
			status: 'success',
			data: {
				menu,
			},
		});
	}
);
