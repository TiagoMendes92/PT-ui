import { useQueryLoader } from "react-relay";
import { CATEGORIES_QUERY } from "./Categories.queries";
import { Suspense, useEffect, useState } from "react";
import { Table } from "./Categories.styles";

import type { CategoriesProps, Category } from "./types";
import { createPortal } from "react-dom";
import Modal from "../../../shared/modal/Modal";
import CategoryModal from "./CategoryModal";
import type { CategoriesQuery } from "../../../../__generated__/CategoriesQuery.graphql";
import TableHead from "./TableHead";
import TableHeader from "./TableHeader";
import DeleteCategoryModal from "./DeleteCategoryModal";
import CategoriesTableBody from "./CategoriesTableBody";

const Categories = ({
  queryRef,
  setIsModalOpen,
  setIsDeleteModalOpen,
}: CategoriesProps) => {
  "use memo";
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

  return (
    <>
      <TableHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
        setIsModalOpen={setIsModalOpen}
      />
      <Table>
        <TableHead />
        <Suspense fallback={<div>Loading...</div>}>
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
      </Table>
    </>
  );
};

const Loader = () => {
  "use memo";

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
    <div>
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
                  onDismiss={() => setIsModalOpen(null)}
                >
                  <CategoryModal
                    category={isModalOpen.category}
                    queryRef={queryRef}
                    onSubmit={handleCategoryAction}
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
                  />
                </Modal>,
                document.body
              )
            : null}
        </>
      )}
    </div>
  );
};

export default Loader;
