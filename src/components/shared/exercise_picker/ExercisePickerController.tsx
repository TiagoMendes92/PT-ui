import { Controller } from "react-hook-form";
import type { ExercisePickerControllerProps } from "./types";
import { Suspense } from "react";
import ExercisePicker from "./ExercisePicker";
import { Error } from "../styles/Form.styled";
import type { SelectedExercise } from "../../pt/components/templates/Templates.types";

const ExercisePickerController = ({
  control,
  controlName,
  catsQueryRef,
}: ExercisePickerControllerProps) => (
  <Controller
    name={controlName}
    control={control}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <>
        <Suspense fallback={<div>Loading...</div>}>
          <ExercisePicker
            initialValues={value as SelectedExercise[]}
            onChange={onChange}
            catsQueryRef={catsQueryRef}
          />
        </Suspense>
        {error && (
          <Error generic className="montserrat-bold">
            {error.message}
          </Error>
        )}
      </>
    )}
  />
);
export default ExercisePickerController;
