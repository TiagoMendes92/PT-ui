import { usePaginationFragment, usePreloadedQuery } from "react-relay";
import type { Exercise_VariablesTableBodyProps } from "./type";
import {
  GET_EXERCISE_VARIABLES,
  GET_EXERCISE_VARIABLES_LIST,
} from "./Exercise_Variables.queries";
import type { ExerciseVariablesQuery } from "../../../../__generated__/ExerciseVariablesQuery.graphql";
import type { ExerciseVariables$key } from "../../../../__generated__/ExerciseVariables.graphql";
import Spinner from "../../../shared/loader/Loader";
import EmptyCategory from "../categories/EmptyCategory";
import HighlightText from "../../../shared/highlight_text/HighlightText";
import { unitOptions } from "./Exercise_VariablesModal";
import { ActionButton, Actions } from "../categories/Categories.styles";
import editIcon from "../../../../icons/edit.svg";
import deleteIcon from "../../../../icons/delete.svg";

const getUnitName = (unitValue: string) => {
  return unitOptions.find((option) => option.value === unitValue)?.label || "-";
};

const Exercise_VariablesTableBody = ({
  exerciseVariablesQueryRef,
  searchTerm,
  setIsModalOpen,
  setIsDeleteModalOpen,
}: Exercise_VariablesTableBodyProps) => {
  const query = usePreloadedQuery<ExerciseVariablesQuery>(
    GET_EXERCISE_VARIABLES,
    exerciseVariablesQueryRef
  );

  const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment<
    ExerciseVariablesQuery,
    ExerciseVariables$key
  >(GET_EXERCISE_VARIABLES_LIST, query);

  return (
    <>
      <tbody>
        {!data.exerciseVariables.edges.length ? (
          <EmptyCategory nrOfCols={3} />
        ) : null}
      </tbody>
      {isLoadingNext ? (
        <Spinner size={25} color="white" />
      ) : (
        data.exerciseVariables.edges.map((exerciseVariable) => {
          if (!exerciseVariable.node) return null;
          return (
            <tr key={exerciseVariable.node.id}>
              <td>
                <HighlightText
                  text={exerciseVariable.node.name}
                  searchTerm={searchTerm}
                />
              </td>
              <td>
                {getUnitName(exerciseVariable.node.unit || "")}{" "}
                {exerciseVariable.node.unit !== "r"
                  ? `(${exerciseVariable.node.unit})`
                  : ""}
              </td>
              <td>
                <Actions>
                  <ActionButton
                    onClick={() =>
                      setIsModalOpen({
                        exerciseVariable: exerciseVariable.node,
                      })
                    }
                  >
                    <img src={editIcon} alt="" />
                  </ActionButton>
                  <ActionButton
                    onClick={() => setIsDeleteModalOpen(exerciseVariable.node)}
                  >
                    <img src={deleteIcon} alt="" />
                  </ActionButton>
                </Actions>
              </td>
            </tr>
          );
        })
      )}
      {hasNext && !isLoadingNext ? (
        <button onClick={() => loadNext(10)}>Load more</button>
      ) : null}
    </>
  );
};

export default Exercise_VariablesTableBody;
