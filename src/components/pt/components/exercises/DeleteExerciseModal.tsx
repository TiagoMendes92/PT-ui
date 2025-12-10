import type { DeleteExerciseModalProps } from "./types";
import Loader from "../../../shared/loader/Loader";
import { useMutation } from "react-relay";
import type {
  ExerciseDeleteMutation,
  ExerciseDeleteMutation$data,
} from "../../../../__generated__/ExerciseDeleteMutation.graphql";
import { useState } from "react";
import { EXERCISE_DELETE } from "./Exercise.queries";
import { DeleteModalContent } from "../../../shared/styles/Modal.styled";
import { Button } from "../../../shared/styles/Table.styled";
import { Error } from "../../../shared/styles/Form.styled";
import {
  DismissButton,
  ModalActions,
} from "../../../shared/modal/Modal.styles";
const DeleteExerciseModal = ({
  exercise,
  onDelete,
  onDismiss,
}: DeleteExerciseModalProps) => {
  const [delExercise, isDeletingExercise] =
    useMutation<ExerciseDeleteMutation>(EXERCISE_DELETE);
  const [error, setError] = useState<string>("");

  const deleteExercise = () => {
    delExercise({
      variables: {
        id: exercise.id,
      },
      onCompleted: (response: ExerciseDeleteMutation$data, errors) => {
        if (response.deleteExercise) {
          onDelete();
          return;
        }
        setError(errors?.[0].message || "Erro ao apagar exercício");
      },
      onError: () => {
        setError("Erro ao apagar exercício");
      },
    });
  };

  return (
    <>
      <DeleteModalContent className="montserrat">
        Esta acção é irreversivel. Tem a certeza que quer apagar o exercício{" "}
        <b>"{exercise.name}"</b>?
      </DeleteModalContent>

      {error && (
        <Error generic className="montserrat-bold">
          {error}
        </Error>
      )}
      <ModalActions>
        <Button
          onClick={deleteExercise}
          disabled={isDeletingExercise}
          className="montserrat-bold"
        >
          {isDeletingExercise ? <Loader size={15} color="white" /> : "APAGAR"}
        </Button>
        <DismissButton onClick={onDismiss}>CANCELAR</DismissButton>
      </ModalActions>
    </>
  );
};

export default DeleteExerciseModal;
