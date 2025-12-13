import { useMutation } from "react-relay";
import type { DeleteTemplateModalProps } from "./Templates.types";
import { TEMPLATE_DELETE } from "./Templates.queries";
import type {
  TemplatesDeleteMutation,
  TemplatesDeleteMutation$data,
} from "../../../../__generated__/TemplatesDeleteMutation.graphql";
import { useState } from "react";
import Loader from "../../../shared/loader/Loader";
import { DeleteModalContent } from "../../../shared/styles/Modal.styled";
import { Button } from "../../../shared/styles/Table.styled";
import { Error } from "../../../shared/styles/Form.styled";
const DeleteTemplateModal = ({
  template,
  onDelete,
}: DeleteTemplateModalProps) => {
  const [delTemplate, isDeletingTemplate] =
    useMutation<TemplatesDeleteMutation>(TEMPLATE_DELETE);
  const [error, setError] = useState<string>("");

  const deleteTemplate = () => {
    delTemplate({
      variables: {
        id: template.id,
      },
      onCompleted: (response: TemplatesDeleteMutation$data, errors) => {
        if (response.deleteTemplate) {
          onDelete();
          return;
        }
        setError(errors?.[0].message || "Erro ao apagar template");
      },
      onError: () => {
        setError("Erro ao apagar template");
      },
    });
  };

  return (
    <>
      <DeleteModalContent className="montserrat">
        Esta acção é irreversivel. Tem a certeza que quer apagar o template{" "}
        <b>"{template.name}"</b>? <br />
        <br />
        Este template é composto por:
        <ol>
          {template.exercises.map((exercise) => (
            <li>{exercise.exercise.name}</li>
          ))}
        </ol>
      </DeleteModalContent>

      {error && (
        <Error generic className="montserrat-bold">
          {error}
        </Error>
      )}

      <Button
        onClick={deleteTemplate}
        disabled={isDeletingTemplate}
        className="montserrat-bold"
      >
        {isDeletingTemplate ? <Loader size={25} color="black" /> : "APAGAR"}
      </Button>
    </>
  );
};

export default DeleteTemplateModal;
