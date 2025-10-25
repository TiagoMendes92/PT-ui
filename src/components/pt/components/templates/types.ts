import type { PreloadedQuery } from "react-relay";
import type { Templates$data } from "../../../../__generated__/Templates.graphql";
import type { TemplatesQuery } from "../../../../__generated__/TemplatesQuery.graphql";
import type { CategoriesQuery } from "../../../../__generated__/CategoriesQuery.graphql";

export type Template = NonNullable<
  Templates$data["templates"]["edges"]["0"]["node"]
>;

export type TemplatesProps = {
  queryRef: PreloadedQuery<TemplatesQuery>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<{ template: Template | null } | null>
  >;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<Template | null>>;
};

export type TableHeaderProps = {
  onSearch: () => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<{ template: Template | null } | null>
  >;
};

export type TemplatesGridProps = {
  queryRef: PreloadedQuery<TemplatesQuery>;
  searchTerm: string;
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<{ template: Template | null } | null>
  >;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<Template | null>>;
};

export type TemplatesModalProps = {
  searchTerm: string;
  onSubmit: () => void;
  template: Template | null;
  catsQueryRef: PreloadedQuery<CategoriesQuery>;
};

export type SelectedExercise = {
  exerciseId: string;
  orderPosition: number;
  name: string;
};

export type TemplateFormData = {
  name: string;
  description: string;
  exercises: {
    exerciseId: string;
    orderPosition: number;
  }[];
};

export type DeleteTemplateModalProps = {
  template: Template;
  onDelete: () => void;
};
