import { Controller } from "react-hook-form";
import { Table, Thead } from "../../../shared/styles/Table.styled";
import { ExerciseSetsTableContainer } from "./ExerciseSetsTable.styled";
import type { ExerciseSetsTableProps } from "./User.types";
import { Error } from "../../../shared/styles/Form.styled";

const ExerciseSetsTable = ({
  exercise,
  exerciseIndex,
  control,
  isEditing,
  errors,
}: ExerciseSetsTableProps) => {
  const maxVariablesSet = exercise.sets.reduce(
    (max, set) => (set.variables.length > max.variables.length ? set : max),
    exercise.sets[0]
  );

  const variableHeaders = maxVariablesSet.variables.map((v) => ({
    id: v.variable.id,
    name: v.variable.name,
    unit: v.variable.unit,
  }));

  return (
    <ExerciseSetsTableContainer>
      <h3 className="montserrat">{exercise.exercise.name}</h3>
      <Table className="montserrat">
        <Thead>
          <tr>
            <th>Set</th>
            {variableHeaders.map((vh) => (
              <th key={vh.id}>
                {vh.name} {vh.unit && `(${vh.unit})`}
              </th>
            ))}
          </tr>
        </Thead>
        <tbody>
          {exercise.sets.map((set, setIndex) => (
            <tr key={set.setNumber}>
              <td>{set.setNumber}</td>
              {variableHeaders.map((vh) => {
                const variableIndex = exercise.sets[
                  setIndex
                ].variables.findIndex((v) => v.variable.id === vh.id);

                if (variableIndex === -1) {
                  return <td key={vh.id}>-</td>;
                }

                return (
                  <td key={vh.id}>
                    <input
                      type="hidden"
                      name={`exercises.${exerciseIndex}.sets.${setIndex}.variables.${variableIndex}.id`}
                    />
                    {isEditing ? (
                      <>
                        <Controller
                          name={`exercises.${exerciseIndex}.sets.${setIndex}.variables.${variableIndex}.targetValue`}
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              style={{ width: "60px" }}
                            />
                          )}
                        />
                        {errors?.exercises?.[exerciseIndex]?.sets?.[setIndex]
                          ?.variables?.[variableIndex]?.targetValue && (
                          <Error generic>
                            {
                              errors.exercises[exerciseIndex].sets[setIndex]
                                .variables[variableIndex].targetValue.message
                            }
                          </Error>
                        )}
                      </>
                    ) : (
                      <>
                        {
                          exercise.sets[setIndex].variables[variableIndex]
                            .targetValue
                        }
                        {vh.unit && ` ${vh.unit}`}
                      </>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </ExerciseSetsTableContainer>
  );
};

export default ExerciseSetsTable;
