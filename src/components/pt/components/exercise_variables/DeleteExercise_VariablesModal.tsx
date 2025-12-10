import { useMutation } from "react-relay";
import type {
  ExerciseVariablesDeleteMutation,
  ExerciseVariablesDeleteMutation$data,
} from "../../../../__generated__/ExerciseVariablesDeleteMutation.graphql";
import { EXERCISE_VARIABLE_DELETE } from "./Exercise_Variables.queries";
import { useState } from "react";
import type { DeleteExercise_VariablesModalProps } from "./type";
import Loader from "../../../shared/loader/Loader";
import {
  DismissButton,
  ModalActions,
} from "../../../shared/modal/Modal.styles";
import { Button } from "../../../shared/styles/Table.styled";
import { Error } from "../../../shared/styles/Form.styled";
import { DeleteModalContent } from "../../../shared/styles/Modal.styled";

const DeleteExercise_VariablesModal = ({
  variable,
  onDelete,
  onDismiss,
}: DeleteExercise_VariablesModalProps) => {
  const [delVariable, isDeletingVariable] =
    useMutation<ExerciseVariablesDeleteMutation>(EXERCISE_VARIABLE_DELETE);
  const [error, setError] = useState<string>("");

  const deleteVariable = () => {
    delVariable({
      variables: {
        id: variable.id,
      },
      onCompleted: (response: ExerciseVariablesDeleteMutation$data, errors) => {
        if (response.deleteExerciseVariable) {
          onDelete();
          return;
        }
        setError(errors?.[0].message || "Erro ao apagar variavel");
      },
      onError: () => {
        setError("Erro ao apagar variavel");
      },
    });
  };

  return (
    <>
      <DeleteModalContent className="montserrat">
        Esta acção é irreversivel. Tem a certeza que quer apagar a variavel{" "}
        <b>"{variable.name}"</b>?
      </DeleteModalContent>

      {error && (
        <Error generic className="montserrat-bold">
          {error}
        </Error>
      )}
      <ModalActions>
        <Button
          onClick={deleteVariable}
          disabled={isDeletingVariable}
          className="montserrat-bold"
        >
          {isDeletingVariable ? <Loader size={15} color="white" /> : "APAGAR"}
        </Button>
        <DismissButton onClick={onDismiss}>CANCELAR</DismissButton>
      </ModalActions>
    </>
  );
};

export default DeleteExercise_VariablesModal;
