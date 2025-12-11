import type { PreloadedQuery } from "react-relay";
import type { Templates$data } from "../../../../__generated__/Templates.graphql";
import type { TemplatesQuery } from "../../../../__generated__/TemplatesQuery.graphql";
import type { CategoriesQuery } from "../../../../__generated__/CategoriesQuery.graphql";
import type { ExerciseVariablesAllQuery } from "../../../../__generated__/ExerciseVariablesAllQuery.graphql";

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
  exerciseVariablesRef: PreloadedQuery<ExerciseVariablesAllQuery>;
  onDismiss: () => void;
};

export type ExerciseSet = {
  setNumber: number;
  variables: SetVariable[];
};

type SetVariable = {
  variableId: string;
  targetValue?: string;
};

export type SelectedExercise = {
  exerciseId: string;
  orderPosition: number;
  name: string;
  sets: ExerciseSet[];
};

export type TemplateFormData = {
  name: string;
  description: string;
  photo: File | null;
  exercises: {
    exerciseId: string;
    orderPosition: number;
    sets: ExerciseSet[];
  }[];
};

export type DeleteTemplateModalProps = {
  template: Template;
  onDelete: () => void;
};
