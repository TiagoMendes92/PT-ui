import {
  useLazyLoadQuery,
  usePaginationFragment,
  usePreloadedQuery,
} from "react-relay";
import type { SelectedExercise } from "../../pt/components/templates/Templates.types";
import type { ExerciseQuery } from "../../../__generated__/ExerciseQuery.graphql";
import {
  GET_EXERCISES,
  GET_EXERCISES_LIST,
} from "../../pt/components/exercises/Exercise.queries";
import { useState } from "react";
import type { Exercise$key } from "../../../__generated__/Exercise.graphql";
import {
  Chip,
  ChipsContainer,
} from "../../pt/components/exercises/Exercises.styled";
import type { CategoriesQuery } from "../../../__generated__/CategoriesQuery.graphql";
import { CATEGORIES_QUERY } from "../../pt/components/categories/Categories.queries";
import type { ExercisePickerProps } from "./types";
import Select from "../select/Select";
import type { SelectOption } from "../select/types";
import {
  ChipWithAction,
  Exercise,
  ExercisesList,
  SelectedExercises,
} from "./ExercisePicker.styles";
import addIcon from "../../../icons/add.svg";
import removeIcon from "../../../icons/minus.svg";
import deleteIcon from "../../../icons/delete.svg";
import EmptyCategory from "../../pt/components/categories/EmptyCategory";
import Loader from "../../shared/loader/Loader";
import { FormController, Input } from "../styles/Form.styled";
import { ActionButton, LoadMoreButton } from "../styles/Table.styled";

const ExercisePicker = ({
  initialValues,
  catsQueryRef,
  onChange,
}: ExercisePickerProps) => {
  const [selectedExercises, setSelectedExercises] =
    useState<SelectedExercise[]>(initialValues);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchCat, setSearchCat] = useState<string>("");

  const { categories } = usePreloadedQuery<CategoriesQuery>(
    CATEGORIES_QUERY,
    catsQueryRef
  );

  const categoryOptions = categories.reduce((acc, category) => {
    acc.push({
      value: category.id,
      label: category.name,
    });

    if (category.subcategories && category.subcategories.length > 0) {
      category.subcategories.forEach((sub) => {
        acc.push({
          value: sub.id,
          label: `${category.name} - ${sub.name}`,
        });
      });
    }

    return acc;
  }, [] as SelectOption[]);

  const queryData = useLazyLoadQuery<ExerciseQuery>(GET_EXERCISES, {
    first: 4,
    category: searchCat || undefined,
    searchTerm: searchTerm || undefined,
  });

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    ExerciseQuery,
    Exercise$key
  >(GET_EXERCISES_LIST, queryData);

  const exercises = data.exercises.edges.map((edge) => edge.node);

  const addExercise = (exercise: (typeof exercises)[0]) => {
    const newExercise: SelectedExercise = {
      exerciseId: exercise.id,
      orderPosition: selectedExercises.length + 1,
      name: exercise.name,
    };

    const updated = [...selectedExercises, newExercise];
    setSelectedExercises(updated);
    onChange(updated);
  };

  const removeExercise = (exercise: { id: string }) => {
    const updated = selectedExercises.filter(
      (e) => e.exerciseId !== exercise.id
    );
    setSelectedExercises(updated);
    onChange(updated);
  };

  return (
    <>
      <FormController>
        <Input
          id="exercises"
          type="text"
          className="montserrat"
          hasError={false}
          placeholder="Procurar exercícios por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </FormController>
      <FormController>
        <Select
          options={categoryOptions}
          value={searchCat}
          onChange={(e) => setSearchCat(e)}
          placeholder="Procuar exercícios por categoria"
          hasError={false}
        />
      </FormController>

      {selectedExercises.length ? (
        <SelectedExercises className="montserrat">
          {selectedExercises.map((ex) => (
            <ChipWithAction
              isActive={true}
              onClick={() => removeExercise({ id: ex.exerciseId })}
            >
              {ex.name}
              <ActionButton
                style={{ height: "10px" }}
                action="delete"
                type="button"
              >
                <img src={deleteIcon} />
              </ActionButton>
            </ChipWithAction>
          ))}
        </SelectedExercises>
      ) : null}

      <ExercisesList className="montserrat">
        {exercises.map((exercise) => {
          const isSelected = selectedExercises.some(
            (ex) => ex.exerciseId === exercise.id
          );

          return (
            <Exercise active={isSelected} key={exercise.id}>
              <div>
                <strong>{exercise.name}</strong>
                <ChipsContainer>
                  {exercise.allCategories.map((c) => (
                    <Chip isActive={false} key={c.id}>
                      {c.name}
                    </Chip>
                  ))}
                </ChipsContainer>
              </div>
              <div>
                {isSelected ? (
                  <ActionButton
                    action="delete"
                    type="button"
                    onClick={() => isSelected && removeExercise(exercise)}
                  >
                    <img src={removeIcon} alt="" />
                  </ActionButton>
                ) : (
                  <ActionButton
                    action="edit"
                    type="button"
                    onClick={() => !isSelected && addExercise(exercise)}
                  >
                    <img src={addIcon} alt="" />
                  </ActionButton>
                )}
              </div>
            </Exercise>
          );
        })}
        {isLoadingNext && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBlock: "10px",
            }}
          >
            <Loader />
          </div>
        )}
        {!exercises.length ? <EmptyCategory /> : null}
      </ExercisesList>
      {hasNext && (
        <LoadMoreButton
          type="button"
          onClick={() => loadNext(4)}
          style={{
            transform: "unset",
            marginBottom: "20px",
            marginInline: "auto",
          }}
        >
          <img src="/load-more.svg" />
          LOAD MORE
        </LoadMoreButton>
      )}
    </>
  );
};

export default ExercisePicker;
