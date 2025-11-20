export interface Category {
  id: string;
  nameVi: string;
  nameEn: string;
  nameKm?: string;
  slug: string;
  description: string;
  group: CategoryGroup;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CategoryGroup {
  id: string;
  nameVi: string;
  nameEn: string;
  nameKm?: string;
  slug: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  categories: Category[];
}

export type TransformCategory = Omit<Category, "nameVi" | "nameEn" | "nameKm"> & {
  name: string;
};

export type TransformedCategoryGroup = Omit<CategoryGroup, "nameVi" | "nameEn" | "nameKm" | "categories"> & {
  name: string;
  categories: TransformCategory[];
};