import type { NextFunction, Request, Response } from 'express';
import catchAsyncErrors from '../helpers/catchAsyncErrors';
import NavigationMenu from '../models/navigationMenuModel';
import AppError from '../helpers/appError';
import {
	type INavigationMenuItem,
	type INavigationMenu,
} from '../types/navigationMenu';
import { type INestedCategory, type ICategoryPlain } from '../types/category';
import { generateNestedCategory, getCategoryPath } from '../helpers/category';

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
		// Get navigation menu, populate category field
		const navigation: INavigationMenu<ICategoryPlain> | null =
			await NavigationMenu.findOne({
				name: req.params.name,
			}).populate('items.category', 'name slug level');

		if (!navigation) {
			next(new AppError('Navigation menu not found', 404));
			return;
		}

		// Initiate response object
		const response: INavigationMenu<ICategoryPlain<INestedCategory>> = {
			name: navigation.name,
			extraItems: navigation.extraItems,
			items: [],
		};

		// Convert categories to nested category objects
		let editedItems = await Promise.all(
			navigation.items.map(async (item) => {
				const categoryPath = await getCategoryPath(item.category._id);
				const nestedCategory = generateNestedCategory(categoryPath);

				if (nestedCategory) {
					const { category, ...rest } = item; // Destructure to remove the category
					const itemWithNestedCategory = {
						...rest,
						category: nestedCategory,
					}; // Add the nested category
					return itemWithNestedCategory;
				}

				return null;
			})
		);

		// extract null values
		editedItems = editedItems.filter((item) => item?.category != null);

		response.items = editedItems as Array<
			INavigationMenuItem<ICategoryPlain<INestedCategory>>
		>;

		res.status(200).json({
			status: 'success',
			data: {
				navigation,
			},
		});
	}
);
