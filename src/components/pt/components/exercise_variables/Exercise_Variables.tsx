import { useQueryLoader } from "react-relay";
import type { ExerciseVariablesQuery } from "../../../../__generated__/ExerciseVariablesQuery.graphql";
import { GET_EXERCISE_VARIABLES } from "./Exercise_Variables.queries";
import { Suspense, useEffect, useState } from "react";
import type { Exercise_VariablesProps, ExerciseVariable } from "./type";
import TableHeader from "./TableHeader";
import { Table } from "../categories/Categories.styles";
import Exercise_VariablesTableBody from "./Exercise_VariablesTableBody";
import { createPortal } from "react-dom";
import Modal from "../../../shared/modal/Modal";
import Exercise_VariablesModal from "./Exercise_VariablesModal";
import DeleteExercise_VariablesModal from "./DeleteExercise_VariablesModal";

const Exercise_Variables = ({
  searchTerm,
  setSearchTerm,
  setIsModalOpen,
  setIsDeleteModalOpen,
  exerciseVariablesQueryRef,
}: Exercise_VariablesProps) => {
  "use memo";

  const [localSearchTerm, setLocalSearchTerm] = useState<string>("");

  const handleSearch = () => {
    setSearchTerm(localSearchTerm);
  };

  return (
    <>
      <TableHeader
        onSearch={handleSearch}
        searchTerm={localSearchTerm}
        setSearchTerm={setLocalSearchTerm}
        setIsModalOpen={setIsModalOpen}
      />
      <Table style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th style={{ width: "auto" }}>Nome</th>
            <th style={{ width: "120px" }}>Unidade</th>
            <th style={{ width: "85px" }}>Ações</th>
          </tr>
        </thead>
        <Suspense fallback={<div>Loading...</div>}>
          <Exercise_VariablesTableBody
            exerciseVariablesQueryRef={exerciseVariablesQueryRef}
            searchTerm={searchTerm}
            setIsModalOpen={setIsModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
          />
        </Suspense>
      </Table>
    </>
  );
};

const Loader = () => {
  "use memo";

  const [exerciseVariablesQueryRef, fetcExerciseVariables] =
    useQueryLoader<ExerciseVariablesQuery>(GET_EXERCISE_VARIABLES);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState<{
    exerciseVariable: ExerciseVariable | null;
  } | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState<ExerciseVariable | null>(null);

  useEffect(() => {
    fetcExerciseVariables({
      first: 10,
      searchTerm,
    });
  }, [searchTerm]);

  const handleExerciseVariableAction = () => {
    setIsModalOpen(null);
    setIsDeleteModalOpen(null);
  };

  return (
    <div>
      {exerciseVariablesQueryRef ? (
        <>
          <Exercise_Variables
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setIsModalOpen={setIsModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            exerciseVariablesQueryRef={exerciseVariablesQueryRef}
          />
          {isModalOpen
            ? createPortal(
                <Modal
                  title={
                    isModalOpen.exerciseVariable
                      ? "Editar variável de execício"
                      : "Nova variável de execício"
                  }
                  onDismiss={() => setIsModalOpen(null)}
                >
                  <Exercise_VariablesModal
                    searchTerm={searchTerm}
                    variable={isModalOpen.exerciseVariable}
                    onSubmit={handleExerciseVariableAction}
                  />
                </Modal>,
                document.body
              )
            : isDeleteModalOpen
            ? createPortal(
                <Modal
                  title="Apagar variável de exercício"
                  onDismiss={() => setIsDeleteModalOpen(null)}
                >
                  <DeleteExercise_VariablesModal
                    variable={isDeleteModalOpen}
                    onDelete={handleExerciseVariableAction}
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
