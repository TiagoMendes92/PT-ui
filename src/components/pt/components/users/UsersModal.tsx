import { useForm } from "react-hook-form";
import type { UserFormData, UsersModalProps } from "./types";
import { ConnectionHandler, useMutation } from "react-relay";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type {
  UsersCreateMutation,
  UsersCreateMutation$data,
} from "../../../../__generated__/UsersCreateMutation.graphql";
import { USER_CREATE, USER_EDIT } from "./Users.queries";
import {
  Form,
  FormController,
  Input,
  Error,
} from "../../../shared/styles/Form.styled";
import Loader from "../../../shared/loader/Loader";
import type {
  UsersEditMutation,
  UsersEditMutation$data,
} from "../../../../__generated__/UsersEditMutation.graphql";
import { Button } from "../../../shared/styles/Table.styled";

const UserSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Nome tem que ter 3 caracteres")
    .required("Nome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("Email é obrigatório"),
});

const UsersModal = ({
  searchTerm,
  searchStatus,
  user,
  onSubmit,
}: UsersModalProps) => {
  const [create, isCreating] = useMutation<UsersCreateMutation>(USER_CREATE);
  const [edit, isEditing] = useMutation<UsersEditMutation>(USER_EDIT);

  const isLoading = isCreating || isEditing;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<UserFormData>({
    resolver: yupResolver(UserSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const setManualError = (create: boolean, message?: string) => {
    setError("root", {
      type: "manual",
      message: message || `Erro ao ${create ? "criar" : "editar"} aluno`,
    });
  };

  const onSubmitForm = async (values: UserFormData) => {
    if (!user) {
      create({
        variables: {
          user: values,
          connections: [
            ConnectionHandler.getConnectionID(
              "client:root",
              "UsersPaginatedQuery_adminUsers",
              {
                filter: {
                  search: searchTerm,
                  ...(searchStatus && { status: searchStatus }),
                },
              }
            ),
          ],
        },
        updater: (store) => {
          store.invalidateStore();
        },
        onCompleted: (response: UsersCreateMutation$data, errors) => {
          if (response.addUser?.id) {
            onSubmit();
            return;
          }
          setManualError(true, errors?.[0].message);
        },
        onError: () => {
          setManualError(true);
        },
      });
    } else {
      edit({
        variables: {
          user: { ...values, id: user.id },
        },
        onCompleted: (response: UsersEditMutation$data, errors) => {
          if (response.editUser?.id) {
            onSubmit();
            return;
          }
          setManualError(true, errors?.[0].message);
        },
        onError: () => {
          setManualError(true);
        },
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <FormController>
          <label htmlFor="name" className="montserrat-bold">
            NOME
          </label>
          <Input
            id="name"
            type="text"
            className="montserrat"
            hasError={!!errors.name}
            placeholder="Nome do aluno"
            {...register("name")}
          />
          {errors.name && (
            <Error className="montserrat-bold">{errors.name.message}</Error>
          )}
        </FormController>

        <FormController>
          <label htmlFor="email" className="montserrat-bold">
            EMAIL
          </label>
          <Input
            id="email"
            type="email"
            className="montserrat"
            placeholder="E-mail do aluno"
            hasError={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <Error className="montserrat-bold">{errors.email.message}</Error>
          )}
        </FormController>

        {errors.root?.message && (
          <Error generic className="montserrat-bold">
            {errors.root.message}
          </Error>
        )}

        <Button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="montserrat-bold"
        >
          {isSubmitting || isLoading ? (
            <Loader size={25} color="black" />
          ) : user ? (
            "EDITAR"
          ) : (
            "CRIAR"
          )}
        </Button>
      </Form>
    </>
  );
};

export default UsersModal;
