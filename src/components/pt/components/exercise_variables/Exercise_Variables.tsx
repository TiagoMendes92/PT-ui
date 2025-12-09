import { useQueryLoader } from "react-relay";
import type { ExerciseVariablesQuery } from "../../../../__generated__/ExerciseVariablesQuery.graphql";
import { GET_EXERCISE_VARIABLES } from "./Exercise_Variables.queries";
import { Suspense, useEffect, useState } from "react";
import type { Exercise_VariablesProps, ExerciseVariable } from "./type";
import TableHeader from "./TableHeader";
import {
  Content,
  LoaderContainer,
  Search,
  SearchIcon,
  SearchInput,
  Table,
  TableActions,
  TableContainer,
  Thead,
} from "../categories/Categories.styles";
import Exercise_VariablesTableBody from "./Exercise_VariablesTableBody";
import { createPortal } from "react-dom";
import Modal from "../../../shared/modal/Modal";
import Exercise_VariablesModal from "./Exercise_VariablesModal";
import DeleteExercise_VariablesModal from "./DeleteExercise_VariablesModal";
import { Container } from "./Exercise_Variables.styles";
import searchIcon from "../../../../icons/search.svg";
import Spinner from "../../../shared/loader/Loader";

const Exercise_Variables = ({
  searchTerm,
  setSearchTerm,
  setIsModalOpen,
  setIsDeleteModalOpen,
  exerciseVariablesQueryRef,
}: Exercise_VariablesProps) => {
  const [localSearchTerm, setLocalSearchTerm] = useState<string>("");

  const handleSearch = () => {
    setSearchTerm(localSearchTerm);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== undefined) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, handleSearch]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Container>
      <TableHeader setIsModalOpen={setIsModalOpen} />
      <Content>
        <TableContainer>
          <TableActions>
            <Search>
              <SearchInput
                hasError={false}
                placeholder="Pesquisar por nome..."
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                onKeyUp={handleKeyPress}
              />
              <SearchIcon>
                <img src={searchIcon} />
              </SearchIcon>
            </Search>
          </TableActions>
          <Table>
            <Thead>
              <tr>
                <th style={{ width: "50%" }}>Nome</th>
                <th style={{ width: "25%" }}>Unidade</th>
                <th style={{ width: "25%" }}>Ações</th>
              </tr>
            </Thead>
            <Suspense
              fallback={
                <LoaderContainer>
                  <td colSpan={3}>
                    <Spinner />
                  </td>
                </LoaderContainer>
              }
            >
              <Exercise_VariablesTableBody
                exerciseVariablesQueryRef={exerciseVariablesQueryRef}
                searchTerm={searchTerm}
                setIsModalOpen={setIsModalOpen}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
              />
            </Suspense>
          </Table>
        </TableContainer>
      </Content>
    </Container>
  );
};

const Loader = () => {
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
    <>
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
                  subtitle="Variáveis de exercício que podem ser usadas na criação de treinos. Servem para registar e acompanhar a evolução nos relatórios."
                  onDismiss={() => setIsModalOpen(null)}
                >
                  <Exercise_VariablesModal
                    searchTerm={searchTerm}
                    variable={isModalOpen.exerciseVariable}
                    onSubmit={handleExerciseVariableAction}
                    onDismiss={() => setIsModalOpen(null)}
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
                    onDismiss={() => setIsDeleteModalOpen(null)}
                  />
                </Modal>,
                document.body
              )
            : null}
        </>
      ) : null}
    </>
  );
};

export default Loader;
