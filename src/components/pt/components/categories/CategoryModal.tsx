import type { CategoryFormData, CategoryModalProps } from "./types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm, useWatch } from "react-hook-form";
import Loader from "../../../shared/loader/Loader";
import { useMutation, usePreloadedQuery } from "react-relay/hooks";
import {
  CATEGORIES_QUERY,
  CATEGORY_CREATE,
  CATEGORY_EDIT,
} from "./Categories.queries";

import Select from "../../../shared/select/Select";
import type { SelectOption } from "../../../shared/select/types";
import type {
  CategoriesCreateMutation,
  CategoriesCreateMutation$data,
} from "../../../../__generated__/CategoriesCreateMutation.graphql";
import type { CategoriesQuery } from "../../../../__generated__/CategoriesQuery.graphql";
import type {
  CategoriesEditMutation,
  CategoriesEditMutation$data,
} from "../../../../__generated__/CategoriesEditMutation.graphql";
import PreviewFile from "../../../shared/preview_file/PreviewFiles";
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

const CategorySchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome da categoria é obrigatório")
    .min(3, "Nome da categoria tem que ter 3 caracteres"),
  parent_category: yup.string().default(""),
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

const CategoryModal = ({
  category,
  onSubmit,
  queryRef,
  onDismiss,
}: CategoryModalProps) => {
  const [create, isCreating] =
    useMutation<CategoriesCreateMutation>(CATEGORY_CREATE);
  const [edit, isEditing] = useMutation<CategoriesEditMutation>(CATEGORY_EDIT);

  const isLoading = isCreating || isEditing;

  const { categories } = usePreloadedQuery<CategoriesQuery>(
    CATEGORIES_QUERY,
    queryRef
  );

  const categoryOptions = categories.map((edge) => ({
    value: edge.id,
    label: edge.name,
  })) as SelectOption[];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CategoryFormData>({
    resolver: yupResolver(CategorySchema),
    defaultValues: {
      name: category?.name || "",
      parent_category: category?.parentCategory || "",
      photo: null,
    },
  });

  const photo = useWatch<CategoryFormData, "photo">({
    control,
    name: "photo",
  });

  const setManualError = (create: boolean, message?: string) => {
    setError("root", {
      type: "manual",
      message: message || `Erro ao ${create ? "criar" : "editar"} categoria`,
    });
  };

  const onSubmitForm = async (formValues: CategoryFormData) => {
    const { photo, ...values } = formValues;
    if (!category) {
      create({
        variables: {
          cat: values,
          file: photo,
        },
        onCompleted: (response: CategoriesCreateMutation$data, errors) => {
          if (response.addCategory?.id) {
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
          cat: {
            ...values,
            id: category.id,
          },
          file: photo,
        },
        onCompleted: (response: CategoriesEditMutation$data, errors) => {
          if (response.editCategory?.updatedAt) {
            onSubmit();
            return;
          }
          setManualError(false, errors?.[0].message);
        },
        onError: () => {
          setManualError(false);
        },
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitForm)}>
      <FormController>
        <label htmlFor="name" className="montserrat-bold">
          Nome da categoria
        </label>
        <Input
          id="name"
          type="text"
          className="montserrat"
          hasError={!!errors.name}
          placeholder="Escrever nome da categoria..."
          {...register("name")}
        />
        {errors.name && (
          <Error className="montserrat-bold">{errors.name.message}</Error>
        )}
      </FormController>
      <FormController>
        <label htmlFor="parent_category" className="montserrat-bold">
          Categoria pai (opcional)
        </label>
        <Controller
          name="parent_category"
          control={control}
          render={({ field }) => (
            <Select
              options={categoryOptions}
              value={field.value}
              onChange={field.onChange}
              placeholder="Selecionar categoria pai..."
              hasError={!!errors.parent_category}
            />
          )}
        />
        {errors.parent_category && (
          <Error className="montserrat-bold">
            {errors.parent_category.message}
          </Error>
        )}
      </FormController>
      <FormController>
        <label htmlFor="photo" className="montserrat-bold">
          Fotografia (opcional)
        </label>
        {photo || category?.photo?.url ? (
          <PreviewFile
            width={100}
            height={"auto"}
            file={photo || (category?.photo?.url as string)}
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
          ) : category ? (
            "EDITAR CATEGORIA"
          ) : (
            "CRIAR CATEGORIA"
          )}
        </Button>
        <DismissButton disabled={isSubmitting || isLoading} onClick={onDismiss}>
          CANCELAR
        </DismissButton>
      </ModalActions>
    </Form>
  );
};

export default CategoryModal;
