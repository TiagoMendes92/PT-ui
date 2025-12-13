import type { PreloadedQuery } from "react-relay";
import type { CategoriesQuery } from "../../../__generated__/CategoriesQuery.graphql";
import type { SelectedExercise } from "../../pt/components/templates/Templates.types";
import type { Control } from "react-hook-form";

export type ExercisePickerProps = {
  initialValues: SelectedExercise[];
  catsQueryRef: PreloadedQuery<CategoriesQuery>;
  onChange: (exercises: SelectedExercise[]) => void;
};

export type ExercisePickerControllerProps = {
  control: Control<any>;
  controlName: string;
  catsQueryRef: PreloadedQuery<CategoriesQuery>;
};
