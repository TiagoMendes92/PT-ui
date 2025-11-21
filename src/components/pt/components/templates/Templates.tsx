import { Suspense, useEffect, useState } from "react";
import { useQueryLoader } from "react-relay";
import type { TemplatesQuery } from "../../../../__generated__/TemplatesQuery.graphql";
import { GET_TEMPLATES } from "./Templates.queries";
import { createPortal } from "react-dom";
import type { Template, TemplatesProps } from "./types";
import Modal from "../../../shared/modal/Modal";
import TableHeader from "./TableHeader";
import TemplatesGrid from "./TemplatesGrid";
import TemplatesModal from "./TemplatesModal";
import type { CategoriesQuery } from "../../../../__generated__/CategoriesQuery.graphql";
import { CATEGORIES_QUERY } from "../categories/Categories.queries";
import DeleteTemplateModal from "./DeleteTemplateModal";
import { GET_ALL_EXERCISE_VARIABLES } from "../exercise_variables/Exercise_Variables.queries";
import type { ExerciseVariablesAllQuery } from "../../../../__generated__/ExerciseVariablesAllQuery.graphql";

const Templates = ({
  queryRef,
  searchTerm,
  setSearchTerm,
  setIsModalOpen,
  setIsDeleteModalOpen,
}: TemplatesProps) => {
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
      <Suspense fallback={<div>Loading...</div>}>
        <TemplatesGrid
          queryRef={queryRef}
          searchTerm={searchTerm}
          setIsModalOpen={setIsModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      </Suspense>
    </>
  );
};

const Loader = () => {
  "use memo";

  const [catsQueryRef, fetchCategories] =
    useQueryLoader<CategoriesQuery>(CATEGORIES_QUERY);
  const [exerciseVariablesRef, fetchExerciseCategories] =
    useQueryLoader<ExerciseVariablesAllQuery>(GET_ALL_EXERCISE_VARIABLES);

  const [queryRef, fetchData] = useQueryLoader<TemplatesQuery>(GET_TEMPLATES);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<{
    template: Template | null;
  } | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<Template | null>(
    null
  );

  useEffect(() => {
    fetchData({
      first: 10,
      searchTerm,
    });
  }, [searchTerm]);

  useEffect(() => {
    fetchCategories({});
    fetchExerciseCategories({});
  }, []);

  const handleTemplateAction = () => {
    setIsModalOpen(null);
    setIsDeleteModalOpen(null);
  };

  return (
    <div>
      {queryRef ? (
        <>
          <Templates
            queryRef={queryRef}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setIsModalOpen={setIsModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
          />
          {isModalOpen && catsQueryRef && exerciseVariablesRef
            ? createPortal(
                <Modal
                  title={
                    isModalOpen.template ? "Editar template" : "Novo template"
                  }
                  onDismiss={() => setIsModalOpen(null)}
                >
                  <TemplatesModal
                    catsQueryRef={catsQueryRef}
                    exerciseVariablesRef={exerciseVariablesRef}
                    searchTerm={searchTerm}
                    template={isModalOpen.template}
                    onSubmit={handleTemplateAction}
                  />
                </Modal>,
                document.body
              )
            : isDeleteModalOpen
            ? createPortal(
                <Modal
                  title="Apagar template"
                  onDismiss={() => setIsDeleteModalOpen(null)}
                >
                  <DeleteTemplateModal
                    template={isDeleteModalOpen}
                    onDelete={handleTemplateAction}
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
