import { useMutation } from "react-relay";
import type {
  CategoriesDeleteMutation,
  CategoriesDeleteMutation$data,
} from "../../../../__generated__/CategoriesDeleteMutation.graphql";
import { CATEGORY_DELETE } from "./Categories.queries";
import type { DeleteCategoryModalProps } from "./types";
import Loader from "../../../shared/loader/Loader";
import { useState } from "react";
import { DeleteModalContent } from "../../../shared/styles/Modal.styled";
import { Button } from "../../../shared/styles/Table.styled";
import { Error } from "../../../shared/styles/Form.styled";
import {
  DismissButton,
  ModalActions,
} from "../../../shared/modal/Modal.styles";

const DeleteCategoryModal = ({
  category,
  onDelete,
  onDismiss,
}: DeleteCategoryModalProps) => {
  const [deleteCat, isDeletingCat] =
    useMutation<CategoriesDeleteMutation>(CATEGORY_DELETE);
  const [error, setError] = useState<string>("");

  const deleteCategory = () => {
    deleteCat({
      variables: {
        id: category.id,
      },
      onCompleted: (response: CategoriesDeleteMutation$data, errors) => {
        console.log("response", response);
        if (response.deleteCategory) {
          onDelete();
          return;
        }
        setError(errors?.[0].message || "Erro ao apagar categoria");
      },
      onError: () => {
        setError("Erro ao apagar categoria");
      },
    });
  };

  return (
    <>
      <DeleteModalContent className="montserrat">
        Esta acção é irreversivel. Tem a certeza que quer apagar a categoria{" "}
        <b>"{category.name}"</b>?
        {category.subcategories.length ? (
          <>
            <br />
            <br />
            Ao apagar esta categoria, também ira apagar:
            <ul>
              {category.subcategories.map((sub) => (
                <li>{sub.name}</li>
              ))}
            </ul>
          </>
        ) : null}
      </DeleteModalContent>

      {error && (
        <Error generic className="montserrat-bold">
          {error}
        </Error>
      )}
      <ModalActions>
        <Button
          onClick={deleteCategory}
          disabled={isDeletingCat}
          className="montserrat-bold"
        >
          {isDeletingCat ? <Loader size={15} color="white" /> : "APAGAR"}
        </Button>
        <DismissButton onClick={onDismiss}>CANCELAR</DismissButton>
      </ModalActions>
    </>
  );
};

export default DeleteCategoryModal;
