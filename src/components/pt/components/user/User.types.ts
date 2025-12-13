import type { PreloadedQuery } from "react-relay";
import type {
  UserQuery,
  UserQuery$data,
} from "../../../../__generated__/UserQuery.graphql";
import type { CategoriesQuery } from "../../../../__generated__/CategoriesQuery.graphql";
import type { ExerciseVariablesAllQuery } from "../../../../__generated__/ExerciseVariablesAllQuery.graphql";
import type { ExerciseSet } from "../templates/types";
import type { UserTrainingQuery } from "../../../../__generated__/UserTrainingQuery.graphql";

export type UserProps = {
  queryRef: PreloadedQuery<UserQuery>;
};

export type AdminUser = NonNullable<UserQuery$data["adminUser"]>;

export type UserTrainingPlanProps = {
  user: AdminUser;
  queryRef: PreloadedQuery<UserTrainingQuery>;
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
