import {
  useLazyLoadQuery,
  usePaginationFragment,
  usePreloadedQuery,
} from "react-relay";
import type { SelectedExercise } from "../../pt/components/templates/types";
import type { ExerciseQuery } from "../../../__generated__/ExerciseQuery.graphql";
import {
  GET_EXERCISES,
  GET_EXERCISES_LIST,
} from "../../pt/components/exercises/Exercise.queries";
import { useState } from "react";
import type { Exercise$key } from "../../../__generated__/Exercise.graphql";
import { FormController, Input } from "../../login/LoginPage.styles";
import { ExercisesList } from "../../pt/components/templates/Templates.styles";
import {
  Chip,
  ChipsContainer,
} from "../../pt/components/exercises/Exercises.styles";
import type { CategoriesQuery } from "../../../__generated__/CategoriesQuery.graphql";
import { CATEGORIES_QUERY } from "../../pt/components/categories/Categories.queries";
import type { ExercisePickerProps } from "./types";
import Select from "../select/Select";
import type { SelectOption } from "../select/types";
import {
  ChipWithAction,
  Exercise,
  SelectedExercises,
} from "./ExercisePicker.styles";
import { ActionButton } from "../../pt/components/categories/Categories.styles";
import addIcon from "../../../icons/add.svg";
import removeIcon from "../../../icons/minus.svg";
import deleteIcon from "../../../icons/delete.svg";
import EmptyCategory from "../../pt/components/categories/EmptyCategory";
import Loader from "../../shared/loader/Loader";

const ExercisePicker = ({
  initialValues,
  catsQueryRef,
  onChange,
}: ExercisePickerProps) => {
  "use memo";

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
        <label htmlFor="exercises" className="montserrat-bold">
          EXERCICIOS
        </label>
        <Input
          id="exercises"
          type="text"
          className="montserrat"
          hasError={false}
          placeholder="Procurar exercícios"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </FormController>

      <FormController>
        <label htmlFor="category" className="montserrat-bold">
          CATEGORIA
        </label>
        <Select
          options={categoryOptions}
          value={searchCat}
          onChange={(e) => setSearchCat(e)}
          placeholder="Procuar por categoria"
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
              <ActionButton type="button">
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
                    type="button"
                    onClick={() => isSelected && removeExercise(exercise)}
                  >
                    <img src={removeIcon} alt="" />
                  </ActionButton>
                ) : (
                  <ActionButton
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
        {isLoadingNext && <Loader />}
        {hasNext && (
          <button type="button" onClick={() => loadNext(4)}>
            Load more
          </button>
        )}
        {!exercises.length ? <EmptyCategory /> : null}
      </ExercisesList>
    </>
  );
};

export default ExercisePicker;
