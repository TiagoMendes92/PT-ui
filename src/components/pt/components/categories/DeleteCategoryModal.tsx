import { useMutation } from "react-relay";
import type {
  CategoriesDeleteMutation,
  CategoriesDeleteMutation$data,
} from "../../../../__generated__/CategoriesDeleteMutation.graphql";
import { CATEGORY_DELETE } from "./Categories.queries";
import { DeleteModalContent } from "./Categories.styles";
import type { DeleteCategoryModalProps } from "./types";
import { Button } from "../../../login/LoginPage.styles";
import Loader from "../../../shared/loader/Loader";
import { useState } from "react";
import { Error } from "../../../login/LoginPage.styles";

const DeleteCategoryModal = ({
  category,
  onDelete,
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

      <Button
        onClick={deleteCategory}
        disabled={isDeletingCat}
        className="montserrat-bold"
      >
        {isDeletingCat ? <Loader size={25} color="black" /> : "APAGAR"}
      </Button>
    </>
  );
};

export default DeleteCategoryModal;
