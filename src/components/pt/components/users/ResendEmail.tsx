import { useMutation } from "react-relay";
import { DeleteModalContent } from "../../../shared/styles/Modal.styled";
import { Button } from "../../../shared/styles/Table.styled";
import { Error } from "../../../shared/styles/Form.styled";
import type { ResendEmailProps } from "./types";
import { RESEND_EMAIL } from "./Users.queries";
import type {
  UsersResendEmailMutation,
  UsersResendEmailMutation$data,
} from "../../../../__generated__/UsersResendEmailMutation.graphql";
import { useState } from "react";
import Loader from "../../../shared/loader/Loader";

const ResendEmail = ({ user, onResend }: ResendEmailProps) => {
  const [send, isSending] = useMutation<UsersResendEmailMutation>(RESEND_EMAIL);
  const [error, setError] = useState<string>("");

  const resendEmail = () => {
    send({
      variables: {
        userId: user.id,
      },
      onCompleted: (response: UsersResendEmailMutation$data, errors) => {
        if (response.resendRegistrationEmail.success) {
          onResend();
          return;
        }
        setError(errors?.[0].message || "Erro ao re-enviar email");
      },
      onError: () => {
        setError("Erro ao re-enviar email");
      },
    });
  };

  return (
    <DeleteModalContent className="montserrat">
      Quer re-enviar o e-mail para definir password a {user.name}?
      <br />
      <br />
      {error && (
        <>
          <Error generic className="montserrat-bold">
            {error}
          </Error>
          <br />
        </>
      )}
      <Button
        onClick={resendEmail}
        disabled={isSending}
        className="montserrat-bold"
      >
        {isSending ? <Loader size={25} color="black" /> : "ENVIAR"}
      </Button>
    </DeleteModalContent>
  );
};

export default ResendEmail;
