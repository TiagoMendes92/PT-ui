import * as yup from "yup";
import type { ExerciseFormData, ExerciseModalProps } from "./types";
import { ConnectionHandler, useMutation, usePreloadedQuery } from "react-relay";
import type { CategoriesQuery } from "../../../../__generated__/CategoriesQuery.graphql";
import { CATEGORIES_QUERY } from "../categories/Categories.queries";
import type { SelectOption } from "../../../shared/select/types";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "../categories/Categories.styles";
import {
  FormController,
  Input,
  Error,
  Button,
} from "../../../login/LoginPage.styles";
import Select from "../../../shared/select/Select";
import Loader from "../../../shared/loader/Loader";
import { VerifyButton, VideoInput } from "./Exercises.styles";
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

const ExerciseSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Nome tem que ter 3 caracteres")
    .required("Nome é obrigatório"),
  url: yup
    .string()
    .min(3, "Url tem que ter 3 caracteres")
    .required("Url é obrigatório"),
  category: yup.string().default("").required("Categoria é obrigatória"),
});

const ExerciseModal = ({
  exercise,
  onSubmit,
  searchCat,
  searchTerm,
  catsQueryRef,
}: ExerciseModalProps) => {
  "use memo";

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
    },
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

  const onSubmitForm = async (values: ExerciseFormData) => {
    const url = validateAndGetEmbedUrl();
    if (!url) return;

    if (!exercise) {
      create({
        variables: {
          exercise: values,
          connections: [
            ConnectionHandler.getConnectionID(
              "client:root",
              "ExercisesPaginatedQuery_exercises",
              { category: searchCat, searchTerm }
            ),
          ],
        },
        updater: (store) => {
          store.invalidateStore();
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
          <label htmlFor="category" className="montserrat-bold">
            CATEGORIA
          </label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                options={categoryOptions}
                value={field.value}
                onChange={field.onChange}
                placeholder="Selecionar categoria"
                hasError={!!errors.category}
              />
            )}
          />
          {errors.category && (
            <Error className="montserrat-bold">{errors.category.message}</Error>
          )}
        </FormController>

        <FormController>
          <label htmlFor="url" className="montserrat-bold">
            URL
          </label>
          <VideoInput
            id="url"
            type="text"
            className="montserrat"
            hasError={!!errors.url}
            placeholder="Nome do exercício"
            {...register("url")}
          />
          {errors.url && (
            <Error className="montserrat-bold">{errors.url.message}</Error>
          )}
          <VerifyButton type="button" onClick={checkVideo}>
            <img src={viewIcon} />
          </VerifyButton>
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
          ) : exercise ? (
            "EDITAR"
          ) : (
            "CRIAR"
          )}
        </Button>
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
