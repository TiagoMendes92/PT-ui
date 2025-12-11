import * as yup from "yup";
import type {
  SelectedExercise,
  TemplateFormData,
  TemplatesModalProps,
} from "./types";
import {
  Controller,
  useForm,
  useWatch,
  type FieldErrors,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Form,
  FormController,
  Input,
  Error,
  TextArea,
} from "../../../shared/styles/Form.styled";
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
import ConnectionHandlerPlus from "relay-connection-handler-plus";
import PreviewFile from "../../../shared/preview_file/PreviewFiles";
import { Button } from "../../../shared/styles/Table.styled";
import {
  DismissButton,
  ModalActions,
} from "../../../shared/modal/Modal.styles";

const TemplateSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome do treino é obrigatório")
    .min(3, "Nome do treino tem que ter 3 caracteres"),
  description: yup
    .string()
    .default("")
    .max(200, "Descrição tem que ter menos de 200 caracteres"),
  photo: yup
    .mixed<File>()
    .default(null)
    .nullable()
    .test("fileType", "Só imagens em JPEG, PNG ou WebP", (value) => {
      if (!value) return true;
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      return allowedTypes.includes((value as File).type);
    })
    .test("fileSize", "Imagem deve ter menos de 10MB", (value) => {
      if (!value) return true;
      return (value as File).size <= 10000000;
    }),
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
  onDismiss,
}: TemplatesModalProps) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
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
    control,
    trigger,
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
      photo: null,
      exercises: exercisesInitialValue,
    },
  });

  const photo = useWatch<TemplateFormData, "photo">({
    control,
    name: "photo",
  });

  const setManualError = (create: boolean, message?: string) => {
    setError("root", {
      type: "manual",
      message: message || `Erro ao ${create ? "criar" : "editar"} template`,
    });
  };

  const onSubmitForm = async (formValues: TemplateFormData) => {
    const { photo, ...values } = formValues;
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
          file: photo,
          connections: [
            ConnectionHandler.getConnectionID(
              "client:root",
              "TemplatesPaginatedQuery_templates",
              { searchTerm }
            ),
          ],
        },
        updater: (store) => {
          const root = store.getRoot();
          const connectionKey = "TemplatesPaginatedQuery_templates";

          const connections = ConnectionHandlerPlus.getConnections(
            root,
            connectionKey
          );
          connections.forEach((connection) => {
            connection?.invalidateRecord();
          });
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
          file: photo,
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

  const handleStepOne = async () => {
    const isValid = await trigger("name");

    if (isValid) {
      setStep(2);
    }
  };

  const handleStepTwo = async () => {
    const exercises = getValues("exercises");
    if (!exercises.length) {
      return;
    }
    setStep(3);
  };

  const handleBackToStepOne = () => {
    setStep((prev) => (prev - 1) as 1 | 2);
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
              Nome do treino
            </label>
            <Input
              id="name"
              type="text"
              className="montserrat"
              hasError={!!errors.name}
              placeholder="Escrever nome do treino..."
              {...register("name")}
            />
            {errors.name && (
              <Error className="montserrat-bold">{errors.name.message}</Error>
            )}
          </FormController>
          <FormController>
            <label htmlFor="description" className="montserrat-bold">
              Descrição do treino
            </label>
            <TextArea
              id="description"
              className="montserrat"
              hasError={!!errors.description}
              placeholder="Escrever descrição do exercício..."
              rows={4}
              {...register("description")}
            />
            {errors.description && (
              <Error className="montserrat-bold">
                {errors.description.message}
              </Error>
            )}
          </FormController>
          <FormController>
            <label htmlFor="photo" className="montserrat-bold">
              Fotografia (opcional)
            </label>
            {photo || template?.photo?.url ? (
              <PreviewFile
                width={100}
                height={"auto"}
                file={photo || (template?.photo?.url as string)}
              />
            ) : null}
            <Controller
              name="photo"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <Input
                  {...field}
                  id="photo"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    onChange(file || null);
                  }}
                  hasError={!!errors.photo}
                />
              )}
            />
            {errors.photo && (
              <Error className="montserrat-bold">{errors.photo.message}</Error>
            )}
          </FormController>
          <ModalActions>
            <Button
              type="button"
              onClick={handleStepOne}
              className="montserrat-bold"
            >
              PRÓXIMO
            </Button>
            <DismissButton type="button" onClick={onDismiss}>
              CANCELAR
            </DismissButton>
          </ModalActions>
        </>
      ) : step === 2 ? (
        <>
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
          <ModalActions>
            <Button
              type="button"
              onClick={handleStepTwo}
              className="montserrat-bold"
            >
              PRÓXIMO
            </Button>
            <DismissButton
              type="button"
              onClick={handleBackToStepOne}
              className="montserrat-bold"
            >
              VOLTAR
            </DismissButton>
          </ModalActions>
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
          <ModalActions>
            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="montserrat-bold"
            >
              {isSubmitting || isLoading ? (
                <Loader size={15} color="white" />
              ) : template ? (
                "EDITAR TREINO"
              ) : (
                "CRIAR TREINO"
              )}
            </Button>
            <DismissButton
              type="button"
              onClick={handleBackToStepOne}
              className="montserrat-bold"
            >
              VOLTAR
            </DismissButton>
          </ModalActions>
        </>
      )}
    </Form>
  );
};

export default TemplatesModal;
