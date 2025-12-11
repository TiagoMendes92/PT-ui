import * as yup from "yup";
import type { ExerciseFormData, ExerciseModalProps } from "./types";
import { ConnectionHandler, useMutation, usePreloadedQuery } from "react-relay";
import type { CategoriesQuery } from "../../../../__generated__/CategoriesQuery.graphql";
import { CATEGORIES_QUERY } from "../categories/Categories.queries";
import type { SelectOption } from "../../../shared/select/types";
import { Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "../../../shared/select/Select";
import Loader from "../../../shared/loader/Loader";
import { VerifyButton, VideoInput } from "./Exercises.styled";
import viewIcon from "../../../../icons/eye.svg";
import { getYouTubeEmbedUrl } from "./utils";
import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "../../../shared/modal/Modal";
import Video from "./Video";
import { EXERCISE_CREATE, EXERCISE_EDIT } from "./Exercise.queries";
import type {
  ExerciseCreateMutation,
  ExerciseCreateMutation$data,
} from "../../../../__generated__/ExerciseCreateMutation.graphql";
import type {
  ExerciseEditMutation,
  ExerciseEditMutation$data,
} from "../../../../__generated__/ExerciseEditMutation.graphql";
import PreviewFile from "../../../shared/preview_file/PreviewFiles";
import ConnectionHandlerPlus from "relay-connection-handler-plus";
import {
  Form,
  FormController,
  Input,
  Error,
} from "../../../shared/styles/Form.styled";
import { Button } from "../../../shared/styles/Table.styled";
import {
  DismissButton,
  ModalActions,
} from "../../../shared/modal/Modal.styles";

const ExerciseSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome do exercício é obrigatório")
    .min(3, "Nome do exercício tem que ter 3 caracteres"),
  url: yup
    .string()
    .required("Link do youtube é obrigatório")
    .min(3, "Link do youtube tem que ter 3 caracteres"),
  category: yup
    .string()
    .default("")
    .required("Categoria do exercício é obrigatória"),
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
});

const ExerciseModal = ({
  exercise,
  onSubmit,
  searchCat,
  searchTerm,
  catsQueryRef,
  onDismiss,
}: ExerciseModalProps) => {
  const [showVideo, setShowVideo] = useState<string | null>(null);
  const { categories } = usePreloadedQuery<CategoriesQuery>(
    CATEGORIES_QUERY,
    catsQueryRef
  );

  const [create, isCreating] =
    useMutation<ExerciseCreateMutation>(EXERCISE_CREATE);
  const [edit, isEditing] = useMutation<ExerciseEditMutation>(EXERCISE_EDIT);

  const isLoading = isCreating || isEditing;

  const categoryOptions = categories.reduce((acc, category) => {
    acc.push({
      value: category.id,
      label: category.name,
    });

    if (category.subcategories && category.subcategories.length > 0) {
      category.subcategories.forEach((sub) => {
        acc.push({
          value: sub.id,
          label: `${category.name} - ${sub.name}`,
        });
      });
    }

    return acc;
  }, [] as SelectOption[]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setError,
  } = useForm<ExerciseFormData>({
    resolver: yupResolver(ExerciseSchema),
    defaultValues: {
      name: exercise?.name || "",
      url: exercise?.url || "",
      category: exercise?.category || "",
      photo: null,
    },
  });

  const photo = useWatch<ExerciseFormData, "photo">({
    control,
    name: "photo",
  });

  const setManualError = (create: boolean, message?: string) => {
    setError("root", {
      type: "manual",
      message: message || `Erro ao ${create ? "criar" : "editar"} exercício`,
    });
  };

  const validateAndGetEmbedUrl = (): string | null => {
    const baseUrl = getValues("url");

    if (!baseUrl) {
      setError("root", {
        type: "manual",
        message: `URL obrigatório`,
      });
      return null;
    }

    const url = getYouTubeEmbedUrl(baseUrl);

    if (!url) {
      setError("root", {
        type: "manual",
        message: `URL inválido`,
      });
      return null;
    }

    return url;
  };

  const checkVideo = () => {
    const url = validateAndGetEmbedUrl();
    if (!url) return;

    setShowVideo(url);
  };

  const onSubmitForm = async (formValues: ExerciseFormData) => {
    const url = validateAndGetEmbedUrl();
    if (!url) return;
    const { photo, ...values } = formValues;
    if (!exercise) {
      create({
        variables: {
          exercise: values,
          file: photo,
          connections: [
            ConnectionHandler.getConnectionID(
              "client:root",
              "ExercisesPaginatedQuery_exercises",
              { category: searchCat, searchTerm }
            ),
          ],
        },
        updater: (store) => {
          const root = store.getRoot();
          const connectionKey = "ExercisesPaginatedQuery_exercises";

          const connections = ConnectionHandlerPlus.getConnections(
            root,
            connectionKey
          );
          connections.forEach((connection) => {
            connection?.invalidateRecord();
          });
        },
        onCompleted: (response: ExerciseCreateMutation$data, errors) => {
          if (response.addExercise?.id) {
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
          exercise: { ...values, id: exercise.id },
          file: photo,
        },
        onCompleted: (response: ExerciseEditMutation$data, errors) => {
          if (response.editExercise?.id) {
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
            Nome do exercício
          </label>
          <Input
            id="name"
            type="text"
            className="montserrat"
            hasError={!!errors.name}
            placeholder="Escrever nome do exercício..."
            {...register("name")}
          />
          {errors.name && (
            <Error className="montserrat-bold">{errors.name.message}</Error>
          )}
        </FormController>
        <FormController>
          <label htmlFor="category" className="montserrat-bold">
            Categoria
          </label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                options={categoryOptions}
                value={field.value}
                onChange={field.onChange}
                placeholder="Selecionar categoria de exercício..."
                hasError={!!errors.category}
              />
            )}
          />
          {errors.category && (
            <Error className="montserrat-bold">{errors.category.message}</Error>
          )}
        </FormController>
        <FormController>
          <label htmlFor="photo" className="montserrat-bold">
            Fotografia (opcional)
          </label>
          {photo || exercise?.photo?.url ? (
            <PreviewFile
              width={100}
              height={"auto"}
              file={photo || (exercise?.photo?.url as string)}
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
        <FormController>
          <label htmlFor="url" className="montserrat-bold">
            Link do youtube
          </label>
          <VideoInput
            id="url"
            type="text"
            className="montserrat"
            hasError={!!errors.url}
            placeholder="Escrever Link do youtube..."
            {...register("url")}
          />
          {errors.url && (
            <Error className="montserrat-bold">{errors.url.message}</Error>
          )}
          <VerifyButton type="button" action="view" onClick={checkVideo}>
            <img src={viewIcon} />
          </VerifyButton>
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
            ) : exercise ? (
              "EDITAR EXERCÍCIO"
            ) : (
              "CRIAR EXERCÍCIO"
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
      {showVideo &&
        createPortal(
          <Modal title="Video" onDismiss={() => setShowVideo(null)}>
            <Video url={showVideo} />
          </Modal>,
          document.body
        )}
    </>
  );
};

export default ExerciseModal;
