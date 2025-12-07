import { Suspense, useEffect, useState } from "react";
import type { Exercise, ExercisesProps } from "./types";
import TableHeader from "./TableHeader";
import { createPortal } from "react-dom";
import Modal from "../../../shared/modal/Modal";
import ExerciseModal from "./ExerciseModal";
import { usePreloadedQuery, useQueryLoader } from "react-relay";
import type { CategoriesQuery } from "../../../../__generated__/CategoriesQuery.graphql";
import { CATEGORIES_QUERY } from "../categories/Categories.queries";
import type { ExerciseQuery } from "../../../../__generated__/ExerciseQuery.graphql";
import { GET_EXERCISES } from "./Exercise.queries";
import { Table } from "../categories/Categories.styles";
import type { Category } from "../categories/types";
import DeleteExerciseModal from "./DeleteExerciseModal";
import ExercisesTableBody from "./ExercisesTableBody";

const Exercises = ({
  searchCat,
  setSearchCat,
  searchTerm,
  catsQueryRef,
  exercisesQueryRef,
  setIsModalOpen,
  setSearchTerm,
  setIsDeleteModalOpen,
}: ExercisesProps) => {
  const { categories } = usePreloadedQuery<CategoriesQuery>(
    CATEGORIES_QUERY,
    catsQueryRef
  );

  const [localSearchTerm, setLocalSearchTerm] = useState<string>("");

  const handleSearch = () => {
    setSearchTerm(localSearchTerm);
  };

  return (
    <>
      <TableHeader
        categories={categories as Category[]}
        searchCat={searchCat}
        setSearchCat={setSearchCat}
        onSearch={handleSearch}
        searchTerm={localSearchTerm}
        setSearchTerm={setLocalSearchTerm}
        setIsModalOpen={setIsModalOpen}
      />
      <Table style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th style={{ width: "auto" }}>Nome</th>
            <th style={{ width: "85px" }}>Ações</th>
          </tr>
        </thead>
        <Suspense fallback={<div>Loading...</div>}>
          <ExercisesTableBody
            exercisesQueryRef={exercisesQueryRef}
            searchCat={searchCat}
            searchTerm={searchTerm}
            setIsModalOpen={setIsModalOpen}
            categories={categories as Category[]}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
          />
        </Suspense>
      </Table>
    </>
  );
};

const Loader = () => {
  const [catsQueryRef, fetchCategories] =
    useQueryLoader<CategoriesQuery>(CATEGORIES_QUERY);
  const [exercisesQueryRef, fetcExercises] =
    useQueryLoader<ExerciseQuery>(GET_EXERCISES);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchCat, setSearchCat] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState<{
    exercise: Exercise | null;
  } | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<Exercise | null>(
    null
  );

  useEffect(() => {
    fetchCategories({});
  }, []);

  useEffect(() => {
    fetcExercises({
      first: 10,
      searchTerm,
      category: searchCat,
    });
  }, [searchTerm, searchCat]);

  const handleExerciseAction = () => {
    setIsModalOpen(null);
    setIsDeleteModalOpen(null);
  };

  return (
    <div>
      {catsQueryRef && exercisesQueryRef ? (
        <>
          <Exercises
            searchCat={searchCat}
            setSearchCat={setSearchCat}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            catsQueryRef={catsQueryRef}
            exercisesQueryRef={exercisesQueryRef}
            setIsModalOpen={setIsModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
          />
          {isModalOpen
            ? createPortal(
                <Modal
                  title={
                    isModalOpen.exercise ? "Editar execício" : "Novo execício"
                  }
                  onDismiss={() => setIsModalOpen(null)}
                >
                  <ExerciseModal
                    searchCat={searchCat}
                    searchTerm={searchTerm}
                    exercise={isModalOpen.exercise}
                    catsQueryRef={catsQueryRef}
                    onSubmit={handleExerciseAction}
                  />
                </Modal>,
                document.body
              )
            : isDeleteModalOpen
            ? createPortal(
                <Modal
                  title="Apagar categoria"
                  onDismiss={() => setIsDeleteModalOpen(null)}
                >
                  <DeleteExerciseModal
                    exercise={isDeleteModalOpen}
                    onDelete={handleExerciseAction}
                  />
                </Modal>,
                document.body
              )
            : null}
        </>
      ) : null}
    </div>
  );
};

export default Loader;
