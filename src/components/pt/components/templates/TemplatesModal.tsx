import * as yup from "yup";
import type { TemplateFormData, TemplatesModalProps } from "./Templates.types";
import { Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Form,
  FormController,
  Input,
  Error,
  TextArea,
} from "../../../shared/styles/Form.styled";
import { useState } from "react";
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
import ConnectionHandlerPlus from "relay-connection-handler-plus";
import PreviewFile from "../../../shared/preview_file/PreviewFiles";
import { Button } from "../../../shared/styles/Table.styled";
import {
  DismissButton,
  ModalActions,
} from "../../../shared/modal/Modal.styles";
import ExercisePickerController from "../../../shared/exercise_picker/ExercisePickerController";
import ExerciseConfigurationController from "../../../shared/exercise_configuration/ExerciseConfigurationController";

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
                    targetValue: yup
                      .string()
                      .required("O valor da variável é obrigatório")
                      .test(
                        "positive-number",
                        "O valor tem que ser um número maior que 0",
                        (value) => {
                          if (!value || value.trim() === "") return false;
                          const num = Number(value);
                          return !isNaN(num) && num > 0;
                        }
                      ),
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
    .required("Exercícios são obrigatórios")
    .min(1, "Pelo menos um exercício é obrigatório")
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
        targetValue: targetValue ?? undefined,
        variableId: variable.id,
      })),
    })),
  }));

  const {
    register,
    control,
    trigger,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    getValues,
  } = useForm<TemplateFormData>({
    mode: "onChange",
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

  const handleStepOne = async () => {
    const isValid = await trigger("name");

    if (isValid) {
      setStep(2);
    }
  };

  const handleStepTwo = async () => {
    await trigger("exercises");
    const exercises = getValues("exercises");
    if (!exercises.length) {
      return;
    }
    setStep(3);
  };

  const handleBackToPreviousStep = () => {
    setStep((prev) => (prev - 1) as 1 | 2);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitForm)}>
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
          <ExercisePickerController
            control={control}
            controlName="exercises"
            catsQueryRef={catsQueryRef}
          />
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
              onClick={handleBackToPreviousStep}
              className="montserrat-bold"
            >
              VOLTAR
            </DismissButton>
          </ModalActions>
        </>
      ) : (
        <>
          <ExerciseConfigurationController
            control={control}
            controlName="exercises"
            exerciseVariablesRef={exerciseVariablesRef}
          />
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
              ) : template ? (
                "EDITAR TREINO"
              ) : (
                "CRIAR TREINO"
              )}
            </Button>
            <DismissButton
              type="button"
              onClick={handleBackToPreviousStep}
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
