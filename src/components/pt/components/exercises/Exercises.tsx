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
import type { Category } from "../categories/types";
import DeleteExerciseModal from "./DeleteExerciseModal";
import ExercisesTableBody from "./ExercisesTableBody";
import {
  LoaderContainer,
  Search,
  SearchIcon,
  SearchInput,
  TableContainer,
  TablePageContent,
  TablePageWrapper,
  Thead,
} from "../../../shared/styles/Table.styled";
import searchIcon from "../../../../icons/search.svg";
import type { SelectOption } from "../../../shared/select/types";
import Select from "../../../shared/select/Select";
import Spinner from "../../../shared/loader/Loader";
import { ExerciseActions, ExerciseTable } from "./Exercises.styled";
import useIsMobile from "../../../../hooks/useIsMobile";

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
  const isMobile = useIsMobile(576);
  const isDesktop = useIsMobile(1200);
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
    <TablePageWrapper>
      <TableHeader setIsModalOpen={setIsModalOpen} />
      <TablePageContent>
        <TableContainer>
          <ExerciseActions>
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
            <Select
              style={{ marginTop: "0px" }}
              options={categoryOptions}
              value={searchCat}
              onChange={(e) => {
                setSearchCat(e);
              }}
              placeholder="Pesquisar por categoria..."
              hasError={false}
            />
          </ExerciseActions>
          <ExerciseTable>
            <Thead>
              <tr>
                <th className="name">Nome</th>
                <th className="categories">Categorias</th>
                <th className="image">Imagem</th>
                <th className="actions">Ações</th>
              </tr>
            </Thead>
            <Suspense
              fallback={
                <LoaderContainer>
                  <td colSpan={isMobile ? 2 : isDesktop ? 3 : 4}>
                    <Spinner />
                  </td>
                </LoaderContainer>
              }
            >
              <ExercisesTableBody
                exercisesQueryRef={exercisesQueryRef}
                searchCat={searchCat}
                searchTerm={searchTerm}
                setIsModalOpen={setIsModalOpen}
                categories={categories as Category[]}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
              />
            </Suspense>
          </ExerciseTable>
        </TableContainer>
      </TablePageContent>
    </TablePageWrapper>
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
    <>
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
                  subtitle="Exercícios para serem usados em treinos para alunos."
                  onDismiss={() => setIsModalOpen(null)}
                >
                  <ExerciseModal
                    searchCat={searchCat}
                    searchTerm={searchTerm}
                    exercise={isModalOpen.exercise}
                    catsQueryRef={catsQueryRef}
                    onSubmit={handleExerciseAction}
                    onDismiss={() => setIsModalOpen(null)}
                  />
                </Modal>,
                document.body
              )
            : isDeleteModalOpen
            ? createPortal(
                <Modal
                  title="Apagar Exercício"
                  onDismiss={() => setIsDeleteModalOpen(null)}
                >
                  <DeleteExerciseModal
                    exercise={isDeleteModalOpen}
                    onDelete={handleExerciseAction}
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
