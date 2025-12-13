import type { PreloadedQuery } from "react-relay";
import type { ExerciseVariablesAllQuery } from "../../../__generated__/ExerciseVariablesAllQuery.graphql";
import type { SelectedExercise } from "../../pt/components/templates/Templates.types";
import type { Control, FieldError, FieldErrors } from "react-hook-form";

export type ExerciseConfigurationProps = {
  initialValues: SelectedExercise[];
  onChange: (exercises: SelectedExercise[]) => void;
  exerciseVariablesRef: PreloadedQuery<ExerciseVariablesAllQuery>;
  errors?:
    | FieldError
    | FieldErrors<
        {
          exerciseId: string;
          orderPosition: number;
          sets: {
            setNumber: number;
            variables: {
              variableId: string;
              targetValue?: string;
            }[];
          }[];
        }[]
      >;
};

export type ExerciseConfigurationControllerProps = {
  control: Control<any>;
  controlName: string;
  exerciseVariablesRef: PreloadedQuery<ExerciseVariablesAllQuery>;
};
