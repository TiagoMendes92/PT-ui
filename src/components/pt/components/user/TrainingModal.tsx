import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useState } from "react";
import type { TrainingFormData, TrainingModalProps } from "./User.types";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  Form,
  Error,
  FormController,
  Input,
  TextArea,
} from "../../../shared/styles/Form.styled";
import {
  DismissButton,
  ModalActions,
} from "../../../shared/modal/Modal.styles";
import { Button } from "../../../shared/styles/Table.styled";
import TemplatePicker from "../../../shared/template_picker/TemplatePicker";
import type { Template } from "../templates/Templates.types";
import PreviewFile from "../../../shared/preview_file/PreviewFiles";
import Loader from "../../../shared/loader/Loader";
import { useMutation } from "react-relay";
import { TRAINING_CREATE } from "./UserTraining.queries";
import type {
  UserTrainingCreateMutation,
  UserTrainingCreateMutation$data,
} from "../../../../__generated__/UserTrainingCreateMutation.graphql";
import ExercisePickerController from "../../../shared/exercise_picker/ExercisePickerController";
import ExerciseConfigurationController from "../../../shared/exercise_configuration/ExerciseConfigurationController";

const TrainingSchema = yup.object().shape({
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

const TrainingModal = ({
  onSubmit,
  target_id,
  catsQueryRef,
  exerciseVariablesRef,
  onDismiss,
}: TrainingModalProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [create, isLoading] =
    useMutation<UserTrainingCreateMutation>(TRAINING_CREATE);

  const {
    register,
    control,
    trigger,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    setError,
    getValues,
  } = useForm<TrainingFormData>({
    mode: "onChange",
    resolver: yupResolver(TrainingSchema),
    defaultValues: {
      name: "",
      description: "",
      photo: null,
      exercises: [],
    },
  });

  const pickTemplate = (template: Template) => {
    setValue("name", template.name || "");
    setValue("description", template.description || "");

    const exercisesValue = (template.exercises || []).map((e) => ({
      name: e.exercise.name,
      exerciseId: e.exercise.id,
      orderPosition: e.orderPosition,
      sets: (e.sets || []).map((s) => ({
        ...s,
        variables: (s.variables || []).map(({ targetValue, variable }) => ({
          targetValue: targetValue as string,
          variableId: variable.id,
        })),
      })),
    }));

    setValue("exercises", exercisesValue);
    setStep(2);
    setSelectedTemplate(template);
  };

  const goWithoutTemplate = () => {
    setValue("name", "");
    setValue("description", "");
    setValue("exercises", []);
    setSelectedTemplate(null);
    setStep(2);
  };

  const photo = useWatch<TrainingFormData, "photo">({
    control,
    name: "photo",
  });

  const handleBackToPreviousStep = () => {
    setStep((prev) => (prev - 1) as 1 | 2 | 3);
  };

  const handleStepOne = async () => {
    const isValid = await trigger("name");

    if (isValid) {
      setStep(3);
    }
  };

  const handleStepTwo = async () => {
    const isValid = await trigger("exercises");
    const exercises = getValues("exercises");
    if (!isValid && !exercises.length) {
      return;
    }
    setStep(4);
  };

  const setManualError = (message?: string) => {
    setError("root", {
      type: "manual",
      message: message || `Erro ao criar treino`,
    });
  };

  const onSubmitForm = async (formValues: TrainingFormData) => {
    const { photo, ...values } = formValues;
    let photoInput;
    if (
      !photo &&
      selectedTemplate?.photo?.url &&
      selectedTemplate?.photo?.key
    ) {
      photoInput = {
        url: selectedTemplate.photo.url,
        key: selectedTemplate.photo.key,
      };
    }
    create({
      variables: {
        input: {
          target_id,
          ...values,
          exercises: values.exercises.map((e) => ({
            ...e,
            name: undefined,
          })),
          photo: photoInput,
        },
        file: photo,
      },
      onCompleted: (response: UserTrainingCreateMutation$data, errors) => {
        if (response.createTraining?.id) {
          onSubmit();
          return;
        }
        setManualError(errors?.[0].message);
      },
      onError: () => {
        setManualError();
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitForm)}>
      {step === 1 ? (
        <>
          <span className="montserrat-bold">Usar algum template de base?</span>
          <br />
          <br />
          <TemplatePicker onChange={pickTemplate} />
          <ModalActions>
            <Button
              type="button"
              onClick={goWithoutTemplate}
              className="montserrat-bold"
            >
              SEM TEMPLATE
            </Button>
            <DismissButton type="button" onClick={onDismiss}>
              CANCELAR
            </DismissButton>
          </ModalActions>
        </>
      ) : step === 2 ? (
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
            {photo || selectedTemplate?.photo?.url ? (
              <PreviewFile
                width={100}
                height={"auto"}
                file={photo || (selectedTemplate?.photo?.url as string)}
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
            <DismissButton type="button" onClick={handleBackToPreviousStep}>
              VOLTAR
            </DismissButton>
          </ModalActions>
        </>
      ) : step === 3 ? (
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

export default TrainingModal;
