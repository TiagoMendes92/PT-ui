import * as yup from "yup";
import type {
  SelectedExercise,
  TemplateFormData,
  TemplatesModalProps,
} from "./types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "../categories/Categories.styles";
import {
  FormController,
  Input,
  Error,
  Button,
} from "../../../login/LoginPage.styles";
import { TextArea } from "./Templates.styles";
import { Suspense } from "react";
import ExercisePicker from "../../../shared/exercise_picker/ExercisePicker";
import type {
  TemplatesCreateMutation,
  TemplatesCreateMutation$data,
} from "../../../../__generated__/TemplatesCreateMutation.graphql";
import { ConnectionHandler, useMutation } from "react-relay";
import { TEMPLATES_CREATE, TEMPLATES_EDIT } from "./Templates.queries";
import Loader from "../../../shared/loader/Loader";
import type {
  TemplatesEditMutation,
  TemplatesEditMutation$data,
} from "../../../../__generated__/TemplatesEditMutation.graphql";

const TemplateSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Categoria tem que ter 3 caracteres")
    .required("Nome é obrigatório"),
  description: yup
    .string()
    .default("")
    .max(200, "Descrição tem que ter menos de 200 caracteres"),
  exercises: yup
    .array()
    .of(
      yup.object().shape({
        exerciseId: yup.string().required(),
        orderPosition: yup.number().required(),
      })
    )
    .min(1, "Pelo menos um exercício é obrigatório")
    .required("Exercícios são obrigatórios"),
});

const TemplatesModal = ({
  searchTerm,
  onSubmit,
  catsQueryRef,
  template,
}: TemplatesModalProps) => {
  "use memo";

  const [create, isCreating] =
    useMutation<TemplatesCreateMutation>(TEMPLATES_CREATE);
  const [edit, isEditing] = useMutation<TemplatesEditMutation>(TEMPLATES_EDIT);

  const isLoading = isCreating || isEditing;

  const exercisesInitialValue = (template?.exercises || []).map((e) => ({
    name: e.exercise.name,
    exerciseId: e.exercise.id,
    orderPosition: e.orderPosition,
  }));

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TemplateFormData>({
    resolver: yupResolver(TemplateSchema),
    defaultValues: {
      name: template?.name || "",
      description: template?.description || "",
      exercises: exercisesInitialValue,
    },
  });

  const setManualError = (create: boolean, message?: string) => {
    setError("root", {
      type: "manual",
      message: message || `Erro ao ${create ? "criar" : "editar"} exercício`,
    });
  };

  const onSubmitForm = async (values: TemplateFormData) => {
    if (!template) {
      create({
        variables: {
          input: {
            name: values.name,
            description: values.description,
            exercises: values.exercises.map((e, i) => ({
              exerciseId: e.exerciseId,
              orderPosition: i + 1,
            })),
          },
          connections: [
            ConnectionHandler.getConnectionID(
              "client:root",
              "TemplatesPaginatedQuery_templates",
              { searchTerm }
            ),
          ],
        },
        updater: (store) => {
          store.invalidateStore();
        },
        onCompleted: (response: TemplatesCreateMutation$data, errors) => {
          if (response.createTemplate?.id) {
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
          input: {
            id: template.id,
            name: values.name,
            description: values.description,
            exercises: values.exercises.map((e, i) => ({
              exerciseId: e.exerciseId,
              orderPosition: i + 1,
            })),
          },
        },
        onCompleted: (response: TemplatesEditMutation$data, errors) => {
          if (response.updateTemplate?.id) {
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

  const onExerciseChange = (exercises: SelectedExercise[]) => {
    setValue("exercises", exercises);
  };

  return (
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
      <Suspense fallback={<div>Loading...</div>}>
        <ExercisePicker
          initialValues={exercisesInitialValue}
          onChange={onExerciseChange}
          catsQueryRef={catsQueryRef}
        />
      </Suspense>

      {errors.exercises && (
        <Error
          style={{ position: "unset", transform: "unset" }}
          className="montserrat-bold"
        >
          {errors.exercises.message}
        </Error>
      )}

      <Button
        style={{ marginTop: "10px" }}
        type="submit"
        disabled={isSubmitting || isLoading}
        className="montserrat-bold"
      >
        {isSubmitting || isLoading ? (
          <Loader size={25} color="black" />
        ) : template ? (
          "EDITAR"
        ) : (
          "CRIAR"
        )}
      </Button>
    </Form>
  );
};

export default TemplatesModal;
