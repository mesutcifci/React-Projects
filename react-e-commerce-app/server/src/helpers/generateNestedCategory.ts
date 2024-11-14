import { type ICategory } from '../types/category';

interface INestedCategory extends ICategory {
	children: INestedCategory[];
}

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
