import type { PreloadedQuery } from "react-relay";
import type { CategoriesQuery } from "../../../../__generated__/CategoriesQuery.graphql";
import type { ExerciseQuery } from "../../../../__generated__/ExerciseQuery.graphql";
import type { Exercise$data } from "../../../../__generated__/Exercise.graphql";
import type { Category } from "../categories/types";

export type Exercise = NonNullable<
  Exercise$data["exercises"]["edges"]["0"]["node"]
>;

export type ExercisesProps = {
  searchCat: string;
  setSearchCat: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  catsQueryRef: PreloadedQuery<CategoriesQuery>;
  exercisesQueryRef: PreloadedQuery<ExerciseQuery>;
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<{ exercise: Exercise | null } | null>
  >;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<Exercise | null>>;
};

export type TableHeaderProps = {
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<{ exercise: Exercise | null } | null>
  >;
};

export type ExerciseModalProps = {
  searchCat: string;
  searchTerm: string;
  exercise: Exercise | null;
  catsQueryRef: PreloadedQuery<CategoriesQuery>;
  onSubmit: () => void;
  onDismiss: () => void;
};

export type ExerciseFormData = {
  name: string;
  url: string;
  category: string;
  photo: File | null;
};

export type VideoProps = {
  url: string;
};

export type ChipType = {
  id: string;
  label: string;
};

export type DeleteExerciseModalProps = {
  exercise: Exercise;
  onDelete: () => void;
  onDismiss: () => void;
};

export type ExercisesTableBodyProps = {
  searchCat: string;
  searchTerm: string;
  exercisesQueryRef: PreloadedQuery<ExerciseQuery>;
  categories: Category[];
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<{ exercise: Exercise | null } | null>
  >;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<Exercise | null>>;
};
