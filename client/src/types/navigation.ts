export interface CategoryImage {
  url: string;
  link: string;
  _id: string;
  id: string;
}

export interface AncestorItem {
  name: string;
  categoryId: string;
  slug: string;
  depth: number;
  _id: string;
  id: string;
}

export interface Category {
  _id: string;
  name: string;
  level: number;
  images: CategoryImage[];
  icons: string[];
  createdAt: string;
  updatedAt: string;
  slug: string;
  parentId: string | null;
  ancestor: AncestorItem[] | null;
  id: string;
  children: Category[];
}
