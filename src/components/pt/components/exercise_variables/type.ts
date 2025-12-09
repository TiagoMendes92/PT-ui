import type { PreloadedQuery } from "react-relay";
import type { ExerciseVariables$data } from "../../../../__generated__/ExerciseVariables.graphql";
import type { ExerciseVariablesQuery } from "../../../../__generated__/ExerciseVariablesQuery.graphql";

export type ExerciseVariable = NonNullable<
  ExerciseVariables$data["exerciseVariables"]["edges"]["0"]["node"]
>;

export type Exercise_VariablesProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<{ exerciseVariable: ExerciseVariable | null } | null>
  >;
  exerciseVariablesQueryRef: PreloadedQuery<ExerciseVariablesQuery>;
  setIsDeleteModalOpen: React.Dispatch<
    React.SetStateAction<ExerciseVariable | null>
  >;
};

export type TableHeaderProps = {
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<{ exerciseVariable: ExerciseVariable | null } | null>
  >;
};

export type Exercise_VariablesTableBodyProps = {
  exerciseVariablesQueryRef: PreloadedQuery<ExerciseVariablesQuery>;
  searchTerm: string;
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<{ exerciseVariable: ExerciseVariable | null } | null>
  >;
  setIsDeleteModalOpen: React.Dispatch<
    React.SetStateAction<ExerciseVariable | null>
  >;
};

export type Exercise_VariablesFormData = {
  name: string;
  unit: string;
  description: string;
};

export type Exercise_VariablesModalProps = {
  searchTerm: string;
  variable: ExerciseVariable | null;
  onSubmit: () => void;
  onDismiss: () => void;
};

export type DeleteExercise_VariablesModalProps = {
  variable: ExerciseVariable;
  onDelete: () => void;
  onDismiss: () => void;
};
