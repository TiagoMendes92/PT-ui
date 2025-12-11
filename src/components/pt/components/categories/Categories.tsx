import { useQueryLoader } from "react-relay";
import { CATEGORIES_QUERY } from "./Categories.queries";
import { Suspense, useEffect, useState } from "react";

import type { CategoriesProps, Category } from "./types";
import { createPortal } from "react-dom";
import Modal from "../../../shared/modal/Modal";
import CategoryModal from "./CategoryModal";
import type { CategoriesQuery } from "../../../../__generated__/CategoriesQuery.graphql";
import TableHeader from "./TableHeader";
import DeleteCategoryModal from "./DeleteCategoryModal";
import CategoriesTableBody from "./CategoriesTableBody";
import {
  Thead,
  Search,
  SearchIcon,
  SearchInput,
  TableActions,
  TableContainer,
  TablePageContent,
  TablePageWrapper,
  LoaderContainer,
} from "../../../shared/styles/Table.styled";
import searchIcon from "../../../../icons/search.svg";
import { CategoriesTable } from "./Categories.styled";
import Spinner from "../../../shared/loader/Loader";
import useIsMobile from "../../../../hooks/useIsMobile";

const Categories = ({
  queryRef,
  setIsModalOpen,
  setIsDeleteModalOpen,
}: CategoriesProps) => {
  const isMobile = useIsMobile(490);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cats, setCats] = useState<Category[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [openCats, setOpenCats] = useState<Category[]>([]);

  const handleSearch = () => {
    setOpenCats([]);
    if (!searchTerm.trim()) {
      setCategories(cats as Category[]);
      setOpenCats([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered: Category[] = [];
    const toOpen: Category[] = [];

    cats.forEach((category) => {
      const parentMatches = category.name.toLowerCase().includes(term);

      if (parentMatches) {
        filtered.push(category);
      } else {
        const matchingSubcategories = category.subcategories?.filter((sub) =>
          sub.name.toLowerCase().includes(term)
        );

        if (matchingSubcategories && matchingSubcategories.length > 0) {
          const filteredCategory = {
            ...category,
            subcategories: matchingSubcategories,
          };
          filtered.push(filteredCategory);
          toOpen.push(filteredCategory);
        }
      }
    });

    setCategories(filtered);
    setOpenCats(toOpen);
  };

  useEffect(() => {
    setCategories(cats);
  }, [cats]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== undefined) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, handleSearch]);

  return (
    <TablePageWrapper>
      <TableHeader setIsModalOpen={setIsModalOpen} />
      <TablePageContent>
        <TableContainer>
          <TableActions>
            <Search>
              <SearchInput
                hasError={false}
                placeholder="Pesquisar por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyUp={handleKeyPress}
              />
              <SearchIcon>
                <img src={searchIcon} />
              </SearchIcon>
            </Search>
          </TableActions>
          <CategoriesTable>
            <Thead>
              <tr>
                <th className="name">Nome</th>
                <th className="image">Imagem</th>
                <th className="actions">Ações</th>
              </tr>
            </Thead>
            <Suspense
              fallback={
                <LoaderContainer>
                  <td colSpan={isMobile ? 2 : 3}>
                    <Spinner />
                  </td>
                </LoaderContainer>
              }
            >
              <CategoriesTableBody
                queryRef={queryRef}
                searchTerm={searchTerm}
                categories={categories}
                setCats={setCats}
                openCats={openCats}
                setOpenCats={setOpenCats}
                setIsModalOpen={setIsModalOpen}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
              />
            </Suspense>
          </CategoriesTable>
        </TableContainer>
      </TablePageContent>
    </TablePageWrapper>
  );
};

const Loader = () => {
  const [isModalOpen, setIsModalOpen] = useState<{
    category: Category | null;
  } | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<Category | null>(
    null
  );

  const [queryRef, fetchData] =
    useQueryLoader<CategoriesQuery>(CATEGORIES_QUERY);

  useEffect(() => {
    fetchData({});
  }, []);

  const handleCategoryAction = () => {
    setIsModalOpen(null);
    setIsDeleteModalOpen(null);
    fetchData({}, { fetchPolicy: "network-only" });
  };

  return (
    <>
      {queryRef && (
        <>
          <Categories
            queryRef={queryRef}
            setIsModalOpen={setIsModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
          />
          {isModalOpen
            ? createPortal(
                <Modal
                  title={
                    isModalOpen.category ? "Editar categoria" : "Nova categoria"
                  }
                  subtitle="Categorias para agrupar exercícios e facilitar a pesquisa."
                  onDismiss={() => setIsModalOpen(null)}
                >
                  <CategoryModal
                    category={isModalOpen.category}
                    queryRef={queryRef}
                    onSubmit={handleCategoryAction}
                    onDismiss={() => setIsModalOpen(null)}
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
                  <DeleteCategoryModal
                    category={isDeleteModalOpen}
                    onDelete={handleCategoryAction}
                    onDismiss={() => setIsDeleteModalOpen(null)}
                  />
                </Modal>,
                document.body
              )
            : null}
        </>
      )}
    </>
  );
};

export default Loader;
