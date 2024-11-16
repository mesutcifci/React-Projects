import { type Types } from 'mongoose';
import Category from '../models/categoryModel';
import type { INestedCategory, ICategory } from '../types/category';

/**
 * Finds the category where the id parameter equal to  categoryId
 * and all related categories with this category.
 */
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
		const children = await getChildrenCategories(categoryId);

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
		const parents = await getParentCategories(categoryId);

		if (parents?.length > 0) {
			path.push(...parents);
			path = sortCategoriesByLevel(path);
			return path;
		}
	}

	const children = await getChildrenCategories(categoryId);
	const parents = await getParentCategories(categoryId);

	/**
	 * 3) If not this is a middle level category so we need to both parents and children
	 */
	path.push(...children);
	path.push(...parents);
	path = sortCategoriesByLevel(path);

	return path;
};

export const getParentCategories = async (
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

export const getChildrenCategories = async (
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

/**
 * Generate an category object that includes sub categories recursively
 *
 * @returns {
 *  name: "Category A"
 *  children: [
 * 		{
 * 			name: "Category B"
 *      children: [...]
 *    }
 *  ]
 * }
 */
export const generateNestedCategory = (
	categories: ICategory[]
): INestedCategory | null => {
	if (categories.length <= 0) {
		return null;
	}

	// Initiate nested category object with first item(top-level category) of categories
	const nestedCategory: INestedCategory = {
		...categories[0],
		children: [],
	} as unknown as INestedCategory;

	// Create a variable to keep track of the current category level in the hierarchy.
	// This variable helps us navigate through each level as we build the nested structure.
	// Starting with the top-level category, it will be updated to the latest child
	// as we add deeper levels to the hierarchy.
	let currentCategory = nestedCategory;

	for (let index = 1; index < categories.length; index++) {
		const children = { ...categories[index], children: [] };
		currentCategory.children.push(children as unknown as INestedCategory);
		currentCategory = children as unknown as INestedCategory;
	}

	return nestedCategory;
};

const sortCategoriesByLevel = (categories: ICategory[]): ICategory[] =>
	categories.sort((item1, item2) => item1.level - item2.level);
