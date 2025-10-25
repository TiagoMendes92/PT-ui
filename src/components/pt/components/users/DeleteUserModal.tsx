import { useMutation } from "react-relay";
import { DeleteModalContent } from "../categories/Categories.styles";
import type { DeleteUserProps } from "./types";
import { USER_ACTIVATE, USER_DEACTIVATE, USER_DELETE } from "./Users.queries";
import type {
  UsersDeleteMutation,
  UsersDeleteMutation$data,
} from "../../../../__generated__/UsersDeleteMutation.graphql";
import type {
  UsersDeactivateMutation,
  UsersDeactivateMutation$data,
} from "../../../../__generated__/UsersDeactivateMutation.graphql";
import { useState } from "react";
import { Button, Error } from "../../../login/LoginPage.styles";
import Loader from "../../../shared/loader/Loader";
import type {
  UsersActivateMutation,
  UsersActivateMutation$data,
} from "../../../../__generated__/UsersActivateMutation.graphql";

const DeleteUserModal = ({ user, action, onDelete }: DeleteUserProps) => {
  "use memo";

  const [archiving, isArchiving] =
    useMutation<UsersDeleteMutation>(USER_DELETE);
  const [deactivating, isDeactivating] =
    useMutation<UsersDeactivateMutation>(USER_DEACTIVATE);
  const [activating, isActivating] =
    useMutation<UsersActivateMutation>(USER_ACTIVATE);
  const [error, setError] = useState<string>("");
  const isLoading = isArchiving || isDeactivating || isActivating;

  const onSubmit = () => {
    const method =
      action === "deactivate"
        ? deactivating
        : action === "activate"
        ? activating
        : archiving;
    const errorMessage = `Erro ao ${
      action === "deactivate"
        ? "desativar"
        : action === "activate"
        ? "ativar"
        : "apagar"
    } aluno`;
    method({
      variables: {
        id: user.id,
      },
      onCompleted: (
        response:
          | UsersDeleteMutation$data
          | UsersDeactivateMutation$data
          | UsersActivateMutation$data,
        errors
      ) => {
        if (
          (response as UsersDeleteMutation$data).deleteUser ||
          (response as UsersDeactivateMutation$data).deactivateUser ||
          (response as UsersActivateMutation$data).activateUser
        ) {
          onDelete();
          return;
        }
        setError(errors?.[0].message || errorMessage);
      },
      onError: () => {
        setError(errorMessage);
      },
    });
  };

  return (
    <>
      <DeleteModalContent className="montserrat">
        {["deactivate", "activate"].includes(action) ? (
          <>
            Tem a certeza que quer{" "}
            {action === "deactivate" ? "desativar" : "ativar"} o aluno{" "}
            <b>{user.name}</b> ?
          </>
        ) : (
          <>
            Esta acção é irreversivel. Tem a certeza que quer apagar o aluno{" "}
            <b>{user.name}</b> ?
          </>
        )}
      </DeleteModalContent>

      {error && (
        <Error generic className="montserrat-bold">
          {error}
        </Error>
      )}

      <Button
        onClick={onSubmit}
        disabled={isLoading}
        className="montserrat-bold"
      >
        {isLoading ? (
          <Loader size={25} color="black" />
        ) : action === "deactivate" ? (
          "DESATIVAR"
        ) : action === "activate" ? (
          "ATIVAR"
        ) : (
          "APAGAR"
        )}
      </Button>
    </>
  );
};

export default DeleteUserModal;
