import type { PreloadedQuery } from "react-relay";
import type { Trainings$data } from "../../../../__generated__/Trainings.graphql";
import type { TrainingsQuery } from "../../../../__generated__/TrainingsQuery.graphql";
import type { CategoriesQuery } from "../../../../__generated__/CategoriesQuery.graphql";
import type { ExerciseVariablesAllQuery } from "../../../../__generated__/ExerciseVariablesAllQuery.graphql";

export type Training = NonNullable<
  Trainings$data["trainings"]["edges"]["0"]["node"]
>;

export type TrainingsProps = {
  queryRef: PreloadedQuery<TrainingsQuery>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<{ training: Training | null } | null>
  >;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<Training | null>>;
};

export type TableHeaderProps = {
  onSearch: () => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<{ training: Training | null } | null>
  >;
};

export type TrainingsGridProps = {
  queryRef: PreloadedQuery<TrainingsQuery>;
  searchTerm: string;
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<{ training: Training | null } | null>
  >;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<Training | null>>;
};

export type TrainingsModalProps = {
  searchTerm: string;
  onSubmit: () => void;
  training: Training | null;
  catsQueryRef: PreloadedQuery<CategoriesQuery>;
  exerciseVariablesRef: PreloadedQuery<ExerciseVariablesAllQuery>;
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

export type TrainingFormData = {
  name: string;
  description: string;
  exercises: {
    exerciseId: string;
    orderPosition: number;
    sets: ExerciseSet[];
  }[];
};
