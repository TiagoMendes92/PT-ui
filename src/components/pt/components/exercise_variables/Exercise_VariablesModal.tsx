import { ConnectionHandler, useMutation } from "react-relay";
import ConnectionHandlerPlus from "relay-connection-handler-plus";

import {
  EXERCISE_VARIABLE_CREATE,
  EXERCISE_VARIABLE_EDIT,
} from "./Exercise_Variables.queries";
import type {
  ExerciseVariablesCreateMutation,
  ExerciseVariablesCreateMutation$data,
} from "../../../../__generated__/ExerciseVariablesCreateMutation.graphql";
import type {
  ExerciseVariablesEditMutation,
  ExerciseVariablesEditMutation$data,
} from "../../../../__generated__/ExerciseVariablesEditMutation.graphql";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import type {
  Exercise_VariablesFormData,
  Exercise_VariablesModalProps,
} from "./type";
import { yupResolver } from "@hookform/resolvers/yup";

import Select from "../../../shared/select/Select";
import Loader from "../../../shared/loader/Loader";
import {
  DismissButton,
  ModalActions,
} from "../../../shared/modal/Modal.styles";
import {
  FormController,
  Input,
  Error,
  Form,
  TextArea,
} from "../../../shared/styles/Form.styled";
import { Button } from "../../../shared/styles/Table.styled";

const VariableSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome da variável é obrigatório")
    .min(3, "Nome da variável tem que ter 3 caracteres"),
  unit: yup.string().default("").required("Unidade da variável é obrigatória"),
  description: yup
    .string()
    .default("")
    .max(200, "Descrição da variável tem que ter menos de 200 caracteres"),
});

export const unitOptions = [
  {
    value: "s",
    label: "segundos",
  },
  {
    value: "r",
    label: "reps",
  },
  {
    value: "kg",
    label: "kgs",
  },
  {
    value: "m",
    label: "metros",
  },
  {
    value: "km",
    label: "kilometros",
  },
];

const Exercise_VariablesModal = ({
  searchTerm,
  variable,
  onSubmit,
  onDismiss,
}: Exercise_VariablesModalProps) => {
  const [create, isCreating] = useMutation<ExerciseVariablesCreateMutation>(
    EXERCISE_VARIABLE_CREATE
  );
  const [edit, isEditing] = useMutation<ExerciseVariablesEditMutation>(
    EXERCISE_VARIABLE_EDIT
  );

  const isLoading = isCreating || isEditing;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<Exercise_VariablesFormData>({
    mode: "onChange",
    resolver: yupResolver(VariableSchema),
    defaultValues: {
      name: variable?.name || "",
      unit: variable?.unit || "",
      description: variable?.description || "",
    },
  });

  const setManualError = (create: boolean, message?: string) => {
    setError("root", {
      type: "manual",
      message:
        message ||
        `Erro ao ${create ? "criar" : "editar"} variavel de exercicio`,
    });
  };

  const onSubmitForm = async (values: Exercise_VariablesFormData) => {
    if (!variable) {
      create({
        variables: {
          variable: values,
          connections: [
            ConnectionHandler.getConnectionID(
              "client:root",
              "ExerciseVariablesPaginatedQuery_exerciseVariables",
              { searchTerm }
            ),
          ],
        },
        updater: (store) => {
          const root = store.getRoot();
          const connectionKey =
            "ExerciseVariablesPaginatedQuery_exerciseVariables";

          const connections = ConnectionHandlerPlus.getConnections(
            root,
            connectionKey
          );
          connections.forEach((connection) => {
            connection?.invalidateRecord();
          });
        },
        onCompleted: (
          response: ExerciseVariablesCreateMutation$data,
          errors
        ) => {
          if (response.addExerciseVariable?.id) {
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
          variable: { ...values, id: variable.id },
        },
        onCompleted: (response: ExerciseVariablesEditMutation$data, errors) => {
          if (response.editExerciseVariable?.id) {
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
            Nome da variável
          </label>
          <Input
            id="name"
            type="text"
            className="montserrat"
            hasError={!!errors.name}
            placeholder="Escrever nome da variável..."
            {...register("name")}
          />
          {errors.name && (
            <Error className="montserrat-bold">{errors.name.message}</Error>
          )}
        </FormController>

        <FormController>
          <label htmlFor="unit" className="montserrat-bold">
            Unidade da variável
          </label>
          <Controller
            name="unit"
            control={control}
            render={({ field }) => (
              <Select
                options={unitOptions}
                value={field.value}
                onChange={field.onChange}
                placeholder="Selecionar unidade da variável..."
                hasError={!!errors.unit}
              />
            )}
          />
          {errors.unit && (
            <Error className="montserrat-bold">{errors.unit.message}</Error>
          )}
        </FormController>
        <FormController>
          <label htmlFor="description" className="montserrat-bold">
            Descrição da variável
          </label>
          <TextArea
            id="description"
            className="montserrat"
            hasError={!!errors.description}
            placeholder="Escrever descrição da variável..."
            rows={4}
            {...register("description")}
          />
          {errors.description && (
            <Error className="montserrat-bold">
              {errors.description.message}
            </Error>
          )}
        </FormController>

        {errors.root?.message && (
          <Error generic className="montserrat-bold">
            {errors.root.message}
          </Error>
        )}
        <ModalActions>
          <Button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="montserrat-bold"
          >
            {isSubmitting || isLoading ? (
              <Loader size={15} color="white" />
            ) : variable ? (
              "EDITAR VARIÁVEL"
            ) : (
              "CRIAR VARIÁVEL"
            )}
          </Button>
          <DismissButton
            disabled={isSubmitting || isLoading}
            onClick={onDismiss}
          >
            CANCELAR
          </DismissButton>
        </ModalActions>
      </Form>
    </>
  );
};

export default Exercise_VariablesModal;
