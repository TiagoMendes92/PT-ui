import { DeleteModalContent } from "../categories/Categories.styles";
import type { DeleteExerciseModalProps } from "./types";
import Loader from "../../../shared/loader/Loader";
import { Button, Error } from "../../../login/LoginPage.styles";
import { useMutation } from "react-relay";
import type {
  ExerciseDeleteMutation,
  ExerciseDeleteMutation$data,
} from "../../../../__generated__/ExerciseDeleteMutation.graphql";
import { useState } from "react";
import { EXERCISE_DELETE } from "./Exercise.queries";

const DeleteExerciseModal = ({
  exercise,
  onDelete,
}: DeleteExerciseModalProps) => {
  "use memo";

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

      <Button
        onClick={deleteExercise}
        disabled={isDeletingExercise}
        className="montserrat-bold"
      >
        {isDeletingExercise ? <Loader size={25} color="black" /> : "APAGAR"}
      </Button>
    </>
  );
};

export default DeleteExerciseModal;
