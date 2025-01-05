import type { INestedCategory, ICategory } from '../types/category';

export const buildCategoryTree = (
	categories: ICategory[],
	parent: string | null = null
): INestedCategory[] => {
	return categories
		.filter((category) => {
			return String(category.parentId) === String(parent);
		})
		.map((filteredCategory) => {
			const id = filteredCategory._id as string;
			const plainCategory = filteredCategory.toObject();
			return {
				...plainCategory,
				children: buildCategoryTree(categories, id),
			};
		});
};
