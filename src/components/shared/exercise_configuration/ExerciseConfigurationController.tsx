import { Controller } from "react-hook-form";
import type { ExerciseConfigurationControllerProps } from "./types";
import ExerciseConfiguration from "./ExerciseConfiguration";
import type { SelectedExercise } from "../../pt/components/templates/Templates.types";
import { Error } from "../styles/Form.styled";
import { Suspense } from "react";

const ExerciseConfigurationController = ({
  control,
  controlName,
  exerciseVariablesRef,
}: ExerciseConfigurationControllerProps) => (
  <Controller
    name={controlName}
    control={control}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <>
        <Suspense fallback={<div>Loading...</div>}>
          <ExerciseConfiguration
            initialValues={value as SelectedExercise[]}
            onChange={onChange}
            exerciseVariablesRef={exerciseVariablesRef}
            errors={error}
          />
        </Suspense>
        {error?.message && (
          <Error generic className="montserrat-bold">
            {error.message}
          </Error>
        )}
      </>
    )}
  />
);

export default ExerciseConfigurationController;
