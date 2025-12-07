import type { PreloadedQuery } from "react-relay";
import type {
  CategoriesQuery,
  CategoriesQuery$data,
} from "../../../../__generated__/CategoriesQuery.graphql";

export type CategoriesProps = {
  queryRef: PreloadedQuery<CategoriesQuery>;
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<{ category: Category | null } | null>
  >;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<Category | null>>;
};

export type CategoryModalProps = {
  category: Category | null;
  onSubmit: () => void;
  queryRef: PreloadedQuery<CategoriesQuery>;
};

export type CategoryFormData = {
  name: string;
  parent_category: string;
  photo: File | null;
};

export type Category = CategoriesQuery$data["categories"][0];

export type TableHeaderProps = {
  searchTerm: string;
  onSearch: () => void;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<{ category: Category | null } | null>
  >;
};

export type DeleteCategoryModalProps = {
  category: Category;
  onDelete: () => void;
};

export type CategoriesTableBodyProps = {
  searchTerm: string;
  queryRef: PreloadedQuery<CategoriesQuery>;
  categories: Category[];
  setCats: React.Dispatch<React.SetStateAction<Category[]>>;
  openCats: Category[];
  setOpenCats: React.Dispatch<React.SetStateAction<Category[]>>;
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<{ category: Category | null } | null>
  >;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<Category | null>>;
};
