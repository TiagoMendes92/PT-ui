import type { PreloadedQuery } from "react-relay";
import type {
  UserQuery,
  UserQuery$data,
} from "../../../../__generated__/UserQuery.graphql";
import type { CategoriesQuery } from "../../../../__generated__/CategoriesQuery.graphql";
import type { ExerciseVariablesAllQuery } from "../../../../__generated__/ExerciseVariablesAllQuery.graphql";
import type { ExerciseSet } from "../templates/Templates.types";
import type {
  UserTrainingQuery,
  UserTrainingQuery$data,
} from "../../../../__generated__/UserTrainingQuery.graphql";
import type { Control, FieldErrors } from "react-hook-form";

export type UserProps = {
  queryRef: PreloadedQuery<UserQuery>;
};

export type AdminUser = NonNullable<UserQuery$data["adminUser"]>;

export type UserTrainingPlanProps = {
  queryRef: PreloadedQuery<UserTrainingQuery>;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<Training | null>>;
};

export type TrainingModalProps = {
  target_id: string;
  onSubmit: () => void;
  catsQueryRef: PreloadedQuery<CategoriesQuery>;
  exerciseVariablesRef: PreloadedQuery<ExerciseVariablesAllQuery>;
  onDismiss: () => void;
};

export type TrainingFormData = {
  name: string;
  description: string;
  photo: File | null;
  exercises: {
    exerciseId: string;
    orderPosition: number;
    sets: ExerciseSet[];
  }[];
};

export type Training = UserTrainingQuery$data["trainings"][0];

export type EditTrainingModalProps = {
  training: Training;
  onSubmit: () => void;
  onDismiss: () => void;
};

export type Exercise = Training["exercises"][0];
export type SetExercise = Exercise["sets"][0];

export type EditTrainingFormData = {
  exercises: {
    exerciseId: string;
    sets: {
      setNumber: number;
      variables: {
        id: string;
        variableId: string;
        targetValue: string;
      }[];
    }[];
  }[];
};

export type ExerciseSetsTableProps = {
  exercise: Exercise;
  exerciseIndex: number;
  control: Control<EditTrainingFormData>;
  isEditing: boolean;
  errors: FieldErrors<EditTrainingFormData>;
};
