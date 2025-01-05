import type { NextFunction, Request, Response } from 'express';
import catchAsyncErrors from '../helpers/catchAsyncErrors';
import NavigationMenu from '../models/navigationMenuModel';
import AppError from '../helpers/appError';
import { type INavigationMenu } from '../types/navigationMenu';
import { buildCategoryTree } from '../helpers/category';
import Category from '../models/categoryModel';

// TODO comment out before production
export const createNavigationMenu = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const menu = await NavigationMenu.create(req.body);

		if (!menu) {
			next(new AppError('Cannot create navigation menu', 500));
			return;
		}

		res.status(201).json({
			status: 'success',
			data: {
				menu,
			},
		});
	}
);

export const getNavigationMenuByName = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const navigation: INavigationMenu | null = await NavigationMenu.findOne({
			name: req.params.name,
		}).lean();

		if (!navigation) {
			next(new AppError('Navigation menu not found', 404));
			return;
		}

		const response: INavigationMenu = {
			name: navigation.name,
			extraItems: navigation.extraItems,
			categories: [],
		};

		const categories = await Category.find();
		const nestedCategories = buildCategoryTree(categories);

		response.categories = nestedCategories;

		res.status(200).json({
			status: 'success',
			data: {
				...response,
			},
		});
	}
);
