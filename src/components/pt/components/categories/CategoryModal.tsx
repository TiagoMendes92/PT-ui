import type { CategoryFormData, CategoryModalProps } from "./types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  FormController,
  Input,
  Error,
  Button,
} from "../../../login/LoginPage.styles";
import { Form } from "./Categories.styles";
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

const CategorySchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Categoria tem que ter 3 caracteres")
    .required("Nome é obrigatório"),
  parent_category: yup.string().default(""),
});

const CategoryModal = ({
  category,
  onSubmit,
  queryRef,
}: CategoryModalProps) => {
  "use memo";

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
    },
  });

  const setManualError = (create: boolean, message?: string) => {
    setError("root", {
      type: "manual",
      message: message || `Erro ao ${create ? "criar" : "editar"} categoria`,
    });
  };

  const onSubmitForm = async (values: CategoryFormData) => {
    if (!category) {
      create({
        variables: {
          cat: values,
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
          NOME
        </label>
        <Input
          id="name"
          type="text"
          className="montserrat"
          hasError={!!errors.name}
          placeholder="Nome da categoria"
          {...register("name")}
        />
        {errors.name && (
          <Error className="montserrat-bold">{errors.name.message}</Error>
        )}
      </FormController>

      <FormController>
        <label htmlFor="parent_category" className="montserrat-bold">
          CATEGORIA PAI (OPCIONAL)
        </label>
        <Controller
          name="parent_category"
          control={control}
          render={({ field }) => (
            <Select
              options={categoryOptions}
              value={field.value}
              onChange={field.onChange}
              placeholder="Selecionar categoria pai"
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
        ) : category ? (
          "EDITAR"
        ) : (
          "CRIAR"
        )}
      </Button>
    </Form>
  );
};

export default CategoryModal;
