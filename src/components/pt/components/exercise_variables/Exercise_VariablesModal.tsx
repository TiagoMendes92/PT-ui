import { ConnectionHandler, useMutation } from "react-relay";
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
import { Form } from "../categories/Categories.styles";
import {
  FormController,
  Error,
  Input,
  Button,
} from "../../../login/LoginPage.styles";
import { TextArea } from "../templates/Templates.styles";
import Select from "../../../shared/select/Select";
import Loader from "../../../shared/loader/Loader";

const VariableSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Nome tem que ter 3 caracteres")
    .required("Nome é obrigatório"),
  unit: yup.string().default("").required("Unidade é obrigatória"),
  description: yup
    .string()
    .default("")
    .max(200, "Descrição tem que ter menos de 200 caracteres"),
});

export const unitOptions = [
  {
    value: "s",
    label: "segundos",
  },
  {
    value: "r",
    label: "repetições",
  },
  {
    value: "kg",
    label: "Kgs",
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
}: Exercise_VariablesModalProps) => {
  "use memo";

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
          store.invalidateStore();
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
            NOME
          </label>
          <Input
            id="name"
            type="text"
            className="montserrat"
            hasError={!!errors.name}
            placeholder="Nome do exercício"
            {...register("name")}
          />
          {errors.name && (
            <Error className="montserrat-bold">{errors.name.message}</Error>
          )}
        </FormController>

        <FormController>
          <label htmlFor="unit" className="montserrat-bold">
            UNIDADE
          </label>
          <Controller
            name="unit"
            control={control}
            render={({ field }) => (
              <Select
                options={unitOptions}
                value={field.value}
                onChange={field.onChange}
                placeholder="Selecionar unidade"
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
            DESCRIÇÃO
          </label>
          <TextArea
            id="description"
            className="montserrat"
            hasError={!!errors.description}
            placeholder="Descrição do exercício"
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

        <Button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="montserrat-bold"
        >
          {isSubmitting || isLoading ? (
            <Loader size={25} color="black" />
          ) : variable ? (
            "EDITAR"
          ) : (
            "CRIAR"
          )}
        </Button>
      </Form>
    </>
  );
};

export default Exercise_VariablesModal;
