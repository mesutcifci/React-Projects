import { type Types } from 'mongoose';
import Category from '../models/categoryModel';
import { type ICategory } from '../types/category';

export const getCategoryPath = async (
	categoryId: Types.ObjectId | string
): Promise<ICategory[]> => {
	let path: ICategory[] = [];

	let currentCategory = await Category.findById(categoryId);

	if (!currentCategory) {
		return path;
	}

	currentCategory = currentCategory.toObject();
	path.push(currentCategory);

	/**
	 * 1) If initial value of currentCategory don't have parentId it means this is a top level category.
	 * So we need to its children from top to bottom.
	 */
	if (!currentCategory?.parentId) {
		const children = await getChildren(categoryId);

		if (children?.length > 0) {
			path.push(...children);
			path = sortCategoriesByLevel(path);
			return path;
		}
	}

	/**
	 * 2) If there Category.findOne({ parentId: categoryId }) returns null it means this is a lowest level category
	 * so we need to find its parents from bottom to top.
	 */

	const isLowestLevelCategory = await Category.findOne({
		parentId: categoryId,
	});

	if (!isLowestLevelCategory) {
		const parents = await getParents(categoryId);

		if (parents?.length > 0) {
			path.push(...parents);
			path = sortCategoriesByLevel(path);
			return path;
		}
	}

	const children = await getChildren(categoryId);
	const parents = await getParents(categoryId);

	/**
	 * 3) If not this is a middle level category so we need to both parents and children
	 */
	path.push(...children);
	path.push(...parents);
	path = sortCategoriesByLevel(path);

	return path;
};

const getParents = async (
	categoryId: Types.ObjectId | string
): Promise<ICategory[]> => {
	const parents = [];
	let currentCategory: ICategory | null = (await Category.findById(
		categoryId
	)) as unknown as ICategory;
	currentCategory = currentCategory?.toObject();

	while (currentCategory) {
		if (currentCategory?.parentId) {
			const parentCategory: ICategory | null = await Category.findById(
				currentCategory.parentId
			);

			if (parentCategory) {
				currentCategory = parentCategory.toObject();
				parents.unshift(currentCategory);
			}
		} else {
			currentCategory = null;
			break;
		}
	}

	return parents;
};

const getChildren = async (
	categoryId: Types.ObjectId | string
): Promise<ICategory[]> => {
	const children = [];

	let currentCategory: ICategory | null = (await Category.findOne({
		parentId: categoryId,
	})) as unknown as ICategory;
	currentCategory = currentCategory?.toObject();

	while (currentCategory) {
		children.push(currentCategory);
		let child: ICategory | null = await Category.findOne({
			parentId: currentCategory._id,
		});

		if (child) {
			child = child.toObject();
		}

		currentCategory = child;
	}

	return children;
};

const sortCategoriesByLevel = (categories: ICategory[]): ICategory[] =>
	categories.sort((item1, item2) => item1.level - item2.level);
