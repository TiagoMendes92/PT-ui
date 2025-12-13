import type { PreloadedQuery } from "react-relay";
import type { CategoriesQuery } from "../../../__generated__/CategoriesQuery.graphql";
import type { SelectedExercise } from "../../pt/components/templates/Templates.types";

export type ExercisePickerProps = {
  initialValues: SelectedExercise[];
  catsQueryRef: PreloadedQuery<CategoriesQuery>;
  onChange: (exercises: SelectedExercise[]) => void;
};
