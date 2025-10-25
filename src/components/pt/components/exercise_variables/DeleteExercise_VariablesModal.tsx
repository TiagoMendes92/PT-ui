import { useMutation } from "react-relay";
import type {
  ExerciseVariablesDeleteMutation,
  ExerciseVariablesDeleteMutation$data,
} from "../../../../__generated__/ExerciseVariablesDeleteMutation.graphql";
import { EXERCISE_VARIABLE_DELETE } from "./Exercise_Variables.queries";
import { useState } from "react";
import type { DeleteExercise_VariablesModalProps } from "./type";
import { DeleteModalContent } from "../categories/Categories.styles";
import { Button, Error } from "../../../login/LoginPage.styles";
import Loader from "../../../shared/loader/Loader";

const DeleteExercise_VariablesModal = ({
  variable,
  onDelete,
}: DeleteExercise_VariablesModalProps) => {
  "use memo";

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

      <Button
        onClick={deleteVariable}
        disabled={isDeletingVariable}
        className="montserrat-bold"
      >
        {isDeletingVariable ? <Loader size={25} color="black" /> : "APAGAR"}
      </Button>
    </>
  );
};

export default DeleteExercise_VariablesModal;
