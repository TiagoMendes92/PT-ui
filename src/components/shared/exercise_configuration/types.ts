import type { PreloadedQuery } from "react-relay";
import type { ExerciseVariablesAllQuery } from "../../../__generated__/ExerciseVariablesAllQuery.graphql";
import type { SelectedExercise } from "../../pt/components/templates/Templates.types";

export type ExerciseConfigurationProps = {
  initialValues: SelectedExercise[];
  onChange: (exercises: SelectedExercise[]) => void;
  exerciseVariablesRef: PreloadedQuery<ExerciseVariablesAllQuery>;
  errors?: any;
};
