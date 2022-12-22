export interface IBase {
  id: string;
  name: string;
  isSelected: boolean;
}

export interface ICategory extends IBase {
  secondaryCategories: ISecondaryCategory[];
}

export interface ISecondaryCategory extends IBase {
  tertiaryCategories: ITertiaryCategory[];
}

export interface ITertiaryCategory extends IBase {
  id: string;
  name: string;
}
