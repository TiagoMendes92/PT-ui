import * as yup from "yup";
import type {
  SelectedExercise,
  TemplateFormData,
  TemplatesModalProps,
} from "./types";
import { useForm, type FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "../categories/Categories.styles";
import {
  FormController,
  Input,
  Error,
  Button,
  CancelButton,
} from "../../../login/LoginPage.styles";
import { TextArea } from "./Templates.styles";
import { Suspense, useState } from "react";
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
import ExerciseConfiguration from "../../../shared/exercise_configuration/ExerciseConfiguration";

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
        sets: yup
          .array()
          .of(
            yup.object().shape({
              setNumber: yup.number().required(),
              variables: yup
                .array()
                .of(
                  yup.object().shape({
                    variableId: yup.string().required(),
                    targetValue: yup.string(),
                  })
                )
                .min(1, "Pelo menos uma variável é obrigatória")
                .default([]),
            })
          )
          .min(1, "Pelo menos um set é obrigatório")
          .default([]),
      })
    )
    .min(1, "Pelo menos um exercício é obrigatório")
    .required("Exercícios são obrigatórios")
    .default([]),
});

const TemplatesModal = ({
  searchTerm,
  onSubmit,
  catsQueryRef,
  exerciseVariablesRef,
  template,
}: TemplatesModalProps) => {
  "use memo";

  const [step, setStep] = useState<1 | 2>(1);
  const [create, isCreating] =
    useMutation<TemplatesCreateMutation>(TEMPLATES_CREATE);
  const [edit, isEditing] = useMutation<TemplatesEditMutation>(TEMPLATES_EDIT);

  const isLoading = isCreating || isEditing;

  const exercisesInitialValue = (template?.exercises || []).map((e) => ({
    name: e.exercise.name,
    exerciseId: e.exercise.id,
    orderPosition: e.orderPosition,
    sets: (e.sets || []).map((s) => ({
      ...s,
      variables: (s.variables || []).map(({ targetValue, variable }) => ({
        targetValue,
        variableId: variable.id,
      })),
    })),
  }));

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    setError,
    getValues,
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
      message: message || `Erro ao ${create ? "criar" : "editar"} template`,
    });
  };

  const onSubmitForm = async (values: TemplateFormData) => {
    if (!template) {
      create({
        variables: {
          input: {
            ...values,
            exercises: values.exercises.map((e) => ({
              ...e,
              name: undefined,
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
            ...values,
            id: template.id,
            exercises: values.exercises.map((e) => ({
              ...e,
              name: undefined,
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

  const handleStepOne = () => {
    const name = getValues("name");
    const exercises = getValues("exercises");
    if (!name || !exercises.length) {
      return;
    }
    setStep(2);
  };

  const handleBackToStepOne = () => {
    setStep(1);
  };

  const onError = (errors: FieldErrors) => {
    console.log("Form validation errors:", errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitForm, onError)}>
      {step === 1 ? (
        <>
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
              initialValues={getValues("exercises") as SelectedExercise[]}
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
            type="button"
            onClick={handleStepOne}
            className="montserrat-bold"
          >
            PRÓXIMO
          </Button>
        </>
      ) : (
        <>
          <Suspense fallback={<div>Loading...</div>}>
            <ExerciseConfiguration
              initialValues={getValues("exercises") as SelectedExercise[]}
              onChange={onExerciseChange}
              exerciseVariablesRef={exerciseVariablesRef}
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

          <CancelButton
            type="button"
            onClick={handleBackToStepOne}
            className="montserrat-bold"
          >
            VOLTAR
          </CancelButton>

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
        </>
      )}
    </Form>
  );
};

export default TemplatesModal;
