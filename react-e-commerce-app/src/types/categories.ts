export interface IBase {
  id: string;
  name: string;
  isSelected: boolean;
}

export interface ICategory extends IBase {
  orderId: number;
  secondaryCategories: ISecondaryCategory[];
}

export interface ISecondaryCategory extends IBase {
  tertiaryCategories: ITertiaryCategory[];
  productAmount: number;
}

export interface ITertiaryCategory extends IBase {
  id: string;
  name: string;
  productAmount: number;
}
