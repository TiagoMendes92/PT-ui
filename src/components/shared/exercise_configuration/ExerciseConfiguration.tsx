import { usePreloadedQuery } from "react-relay";
import type { ExerciseConfigurationProps } from "./types";
import type { ExerciseVariablesAllQuery } from "../../../__generated__/ExerciseVariablesAllQuery.graphql";
import { GET_ALL_EXERCISE_VARIABLES } from "../../pt/components/exercise_variables/Exercise_Variables.queries";
import { useState } from "react";
import type {
  ExerciseSet,
  SelectedExercise,
} from "../../pt/components/templates/types";
import {
  AddSetButton,
  Container,
  ExerciseCard,
  ExerciseHeader,
  RemoveButton,
  SetCard,
  SetHeader,
  SetTitle,
  VariableCheckbox,
  VariableInput,
  VariableItem,
  VariablesGrid,
} from "./ExerciseConfiguration.styles";

const ExerciseConfiguration = ({
  initialValues,
  onChange,
  exerciseVariablesRef,
}: ExerciseConfigurationProps) => {
  const { allVariables } = usePreloadedQuery<ExerciseVariablesAllQuery>(
    GET_ALL_EXERCISE_VARIABLES,
    exerciseVariablesRef
  );

  const [selectedExercises, setSelectedExercises] = useState<
    SelectedExercise[]
  >(
    initialValues.map((ex) => ({
      ...ex,
      sets: ex.sets || [{ setNumber: 1, variables: [] }],
    }))
  );

  const updateExercises = (updatedExercises: SelectedExercise[]) => {
    setSelectedExercises(updatedExercises);
    onChange(updatedExercises);
  };

  const addSet = (exerciseIndex: number) => {
    const updated = [...selectedExercises];
    const exercise = updated[exerciseIndex];
    const newSetNumber = (exercise.sets?.length || 0) + 1;

    const previousSet = exercise.sets?.[exercise.sets.length - 1];
    const newSet: ExerciseSet = {
      setNumber: newSetNumber,
      variables: previousSet
        ? previousSet.variables.map((v) => ({ ...v, targetValue: "" }))
        : [],
    };

    updated[exerciseIndex].sets = [...(exercise.sets || []), newSet];
    updateExercises(updated);
  };

  const removeSet = (exerciseIndex: number, setNumber: number) => {
    const updated = [...selectedExercises];
    updated[exerciseIndex].sets = (updated[exerciseIndex].sets || [])
      .filter((s) => s.setNumber !== setNumber)
      .map((s, idx) => ({ ...s, setNumber: idx + 1 }));
    updateExercises(updated);
  };

  const toggleVariable = (
    exerciseIndex: number,
    setNumber: number,
    variableId: string
  ) => {
    const updated = [...selectedExercises];
    const exercise = updated[exerciseIndex];
    const set = exercise.sets?.find((s) => s.setNumber === setNumber);

    if (!set) return;

    const variableExists = set.variables.some(
      (v) => v.variableId === variableId
    );

    if (variableExists) {
      set.variables = set.variables.filter((v) => v.variableId !== variableId);
    } else {
      set.variables.push({ variableId, targetValue: "" });
    }

    updateExercises(updated);
  };

  const updateVariableValue = (
    exerciseIndex: number,
    setNumber: number,
    variableId: string,
    value: string
  ) => {
    const updated = [...selectedExercises];
    const exercise = updated[exerciseIndex];
    const set = exercise.sets?.find((s) => s.setNumber === setNumber);

    if (!set) return;

    const variable = set.variables.find((v) => v.variableId === variableId);
    if (variable) {
      variable.targetValue = value;
    }

    updateExercises(updated);
  };

  return (
    <Container>
      {selectedExercises.map((exercise, exerciseIndex) => (
        <ExerciseCard key={exercise.exerciseId}>
          <ExerciseHeader className="montserrat-bold">
            {exercise.name}
          </ExerciseHeader>
          {(exercise.sets || []).map((set) => (
            <SetCard key={set.setNumber}>
              <SetHeader>
                <SetTitle className="montserrat-bold">
                  Set {set.setNumber}
                </SetTitle>
                {(exercise.sets?.length || 0) > 1 && (
                  <RemoveButton
                    type="button"
                    onClick={() => removeSet(exerciseIndex, set.setNumber)}
                    className="montserrat-bold"
                  >
                    ✕
                  </RemoveButton>
                )}
              </SetHeader>
              <VariablesGrid>
                {allVariables.map((variable) => {
                  const isSelected = set.variables.some(
                    (v) => v.variableId === variable.id
                  );
                  const variableData = set.variables.find(
                    (v) => v.variableId === variable.id
                  );

                  return (
                    <VariableItem key={variable.id}>
                      <VariableCheckbox>
                        <input
                          type="checkbox"
                          id={`${exercise.exerciseId}-${set.setNumber}-${variable.id}`}
                          checked={isSelected}
                          onChange={() =>
                            toggleVariable(
                              exerciseIndex,
                              set.setNumber,
                              variable.id
                            )
                          }
                        />
                        <label
                          htmlFor={`${exercise.exerciseId}-${set.setNumber}-${variable.id}`}
                          className="montserrat"
                        >
                          {variable.name}
                          {variable.unit && ` (${variable.unit})`}
                        </label>
                      </VariableCheckbox>

                      {isSelected && (
                        <VariableInput
                          type="text"
                          placeholder="Valor alvo"
                          className="montserrat"
                          value={variableData?.targetValue || ""}
                          onChange={(e) =>
                            updateVariableValue(
                              exerciseIndex,
                              set.setNumber,
                              variable.id,
                              e.target.value
                            )
                          }
                        />
                      )}
                    </VariableItem>
                  );
                })}
              </VariablesGrid>
            </SetCard>
          ))}
          <AddSetButton
            type="button"
            onClick={() => addSet(exerciseIndex)}
            className="montserrat-bold"
          >
            + ADICIONAR SET
          </AddSetButton>
        </ExerciseCard>
      ))}
    </Container>
  );
};

export default ExerciseConfiguration;
