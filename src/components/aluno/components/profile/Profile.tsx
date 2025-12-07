import { useMutation, usePreloadedQuery, useQueryLoader } from "react-relay";
import type { ProfileQuery } from "../../../../__generated__/ProfileQuery.graphql";
import {
  GET_PROFILE,
  UPDATE_PROFILE,
  UPLOAD_PROFILE_PHOTO,
} from "./Profile.queries";
import { useEffect, useState } from "react";
import type { ProfileFormData, ProfileProps } from "./types";
import * as yup from "yup";
import type {
  ProfileMutation,
  ProfileMutation$data,
} from "../../../../__generated__/ProfileMutation.graphql";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "../../../pt/components/categories/Categories.styles";
import {
  FormController,
  Input,
  Error,
  Button,
  CancelButton,
} from "../../../login/LoginPage.styles";
import { useAuth, type User } from "../../../app/AuthContent.context";
import Select from "../../../shared/select/Select";
import Spinner from "../../../shared/loader/Loader";
import type {
  ProfilePhotoMutation,
  ProfilePhotoMutation$data,
} from "../../../../__generated__/ProfilePhotoMutation.graphql";
import { Container, Photo } from "./Profile.styles";
import placeholderPhoto from "../../../../assets/placeholder.png";

const userDetailsSchema = yup.object({
  birthday: yup
    .string()
    .required("Data de nascimento é obrigatória")
    .typeError("Data de nascimento deve ser uma data")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Data deve ser no formato: DD/MM/YYYY"),
  height: yup
    .number()
    .required("Altura é obrigatória")
    .typeError("Altura deve ser um número")
    .positive("Altura deve ser positiva")
    .max(300, "Altura tem de ser menos de 300 cm"),
  weight: yup
    .number()
    .required("Peso é obrigatório")
    .typeError("Peso deve ser um número")
    .positive("Peso deve ser positivo")
    .max(300, "Peso deve ser menos de 300kg"),
  sex: yup
    .string()
    .required("Sexo é obrigatório")
    .oneOf(["male", "female"], "Selecione uma das opções"),
});

const Profile = ({ queryRef, user }: ProfileProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const data = usePreloadedQuery<ProfileQuery>(GET_PROFILE, queryRef);

  const [update, isUpdating] = useMutation<ProfileMutation>(UPDATE_PROFILE);
  const [updatePhoto, isUpdatingPhoto] =
    useMutation<ProfilePhotoMutation>(UPLOAD_PROFILE_PHOTO);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ProfileFormData>({
    resolver: yupResolver(userDetailsSchema),
    defaultValues: {
      birthday: data?.userDetails?.birthday
        ? new Date(parseInt(data.userDetails.birthday))
            .toISOString()
            .split("T")[0]
        : "",
      height: data?.userDetails?.height || undefined,
      weight: data?.userDetails?.weight || undefined,
      sex: data?.userDetails?.sex || "",
    },
  });

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError(null);
    const file = e.target.files?.[0];
    if (!file) {
      setPhotoError("Escolha um ficheiro");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setPhotoError("Só imagens em  JPEG, PNG ou WebP");
      return;
    }

    if (file.size > 10000000) {
      setPhotoError("Imagem deve ter menos de 10MB");
      return;
    }

    updatePhoto({
      variables: {
        file,
      },
      onCompleted: (response: ProfilePhotoMutation$data, errors) => {
        if (response.uploadProfilePhoto?.photographyUrl) {
          return;
        }
        setPhotoError(errors?.[0].message || "Erro ao fazer upload");
      },
      onError: () => {
        setPhotoError("Erro ao fazer upload");
      },
    });
  };

  const setManualError = (create: boolean, message?: string) => {
    setError("root", {
      type: "manual",
      message: message || `Erro ao ${create ? "criar" : "editar"} categoria`,
    });
  };

  const onSubmitForm = async (values: ProfileFormData) => {
    update({
      variables: {
        ...values,
      },
      onCompleted: (response: ProfileMutation$data, errors) => {
        if (response.updateUserDetails?.birthday) {
          setIsEditing(false);
          return;
        }
        setManualError(true, errors?.[0].message);
      },
      onError: () => {
        setManualError(true);
      },
    });
  };

  return (
    <Container>
      <Photo>
        <img
          src={data.userDetails?.photographyUrl || placeholderPhoto}
          alt="Profile"
        />

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handlePhotoUpload}
          disabled={isUpdatingPhoto}
        />
        {isUpdatingPhoto && <p>Uploading...</p>}
      </Photo>

      {photoError && (
        <Error generic className="montserrat-bold">
          {photoError}
        </Error>
      )}

      <FormController>
        <div className="montserrat-bold">NOME</div>
        <div>{user?.name}</div>
      </FormController>
      <FormController>
        <div className="montserrat-bold">E-MAIL</div>
        <div>{user?.email}</div>
      </FormController>
      {isEditing ? (
        <Form onSubmit={handleSubmit(onSubmitForm)}>
          <FormController>
            <label htmlFor="birthday" className="montserrat-bold">
              Data de Nascimento
            </label>
            <Input
              id="birthday"
              type="date"
              className="montserrat"
              placeholder="Data de nascimento"
              hasError={!!errors.birthday}
              {...register("birthday")}
            />
            {errors.birthday && (
              <Error className="montserrat-bold">
                {errors.birthday.message}
              </Error>
            )}
          </FormController>
          <FormController>
            <label htmlFor="height" className="montserrat-bold">
              Altura (cm)
            </label>
            <Input
              id="height"
              type="number"
              className="montserrat"
              placeholder="Altura"
              hasError={!!errors.height}
              {...register("height")}
            />
            {errors.height && (
              <Error className="montserrat-bold">{errors.height.message}</Error>
            )}
          </FormController>
          <FormController>
            <label htmlFor="weight" className="montserrat-bold">
              Peso (kg)
            </label>
            <Input
              id="weight"
              type="number"
              className="montserrat"
              placeholder="Peso"
              hasError={!!errors.weight}
              {...register("weight")}
            />
            {errors.weight && (
              <Error className="montserrat-bold">{errors.weight.message}</Error>
            )}
          </FormController>

          <FormController>
            <label htmlFor="sex" className="montserrat-bold">
              Sexo
            </label>
            <Controller
              name="sex"
              control={control}
              render={({ field }) => (
                <Select
                  options={[
                    { value: "male", label: "Masculino" },
                    { value: "female", label: "Feminino" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Selecionar sexo"
                  hasError={!!errors.sex}
                />
              )}
            />
            {errors.sex && (
              <Error className="montserrat-bold">{errors.sex.message}</Error>
            )}
          </FormController>

          {errors.root?.message && (
            <Error generic className="montserrat-bold">
              {errors.root.message}
            </Error>
          )}
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              gap: "20px",
              flexDirection: "column",
            }}
          >
            <CancelButton
              type="button"
              onClick={() => setIsEditing(false)}
              className="montserrat-bold"
            >
              CANCELAR
            </CancelButton>
            <Button
              type="submit"
              disabled={isUpdating}
              className="montserrat-bold"
            >
              {isUpdating ? <Spinner size={25} color="black" /> : "EDITAR"}
            </Button>
          </div>
        </Form>
      ) : (
        <>
          <FormController>
            <div className="montserrat-bold">Data de Nascimento</div>
            <div>
              {data.userDetails?.birthday ? (
                new Date(Number(data.userDetails.birthday)).toLocaleDateString(
                  "pt-BR"
                )
              ) : (
                <i>não definida</i>
              )}
            </div>
          </FormController>
          <FormController>
            <div className="montserrat-bold">Altura (cm)</div>
            <div>{data.userDetails?.height || <i>não definida</i>}</div>
          </FormController>
          <FormController>
            <div className="montserrat-bold">Peso (kg)</div>
            <div>{data.userDetails?.weight || <i>não definido</i>}</div>
          </FormController>
          <FormController>
            <div className="montserrat-bold">Sexo</div>
            <div>
              {data.userDetails?.sex ? (
                data.userDetails.sex === "male" ? (
                  "Masculino"
                ) : (
                  "Feminino"
                )
              ) : (
                <i>não definido</i>
              )}
            </div>
          </FormController>
          <Button
            onClick={() => setIsEditing(true)}
            className="montserrat-bold"
          >
            EDITAR
          </Button>
        </>
      )}
    </Container>
  );
};

export const Loader = () => {
  const { user } = useAuth();
  const [queryRef, fetchData] = useQueryLoader<ProfileQuery>(GET_PROFILE);

  useEffect(() => {
    fetchData({ user_id: user!.id });
  }, []);

  return (
    <div>
      {queryRef ? <Profile queryRef={queryRef} user={user as User} /> : null}
    </div>
  );
};

export default Loader;
