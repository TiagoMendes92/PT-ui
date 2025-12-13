import { useMutation } from "react-relay";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import type { RegisterFormData } from "./types";
import { REGISTER_MUTATION } from "./Register.queries";
import type {
  RegisterPageMutation,
  RegisterPageMutation$data,
} from "../../__generated__/RegisterPageMutation.graphql";
import { Container, Content } from "../login/LoginPage.styles";
import Loader from "../shared/loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../shared/styles/Typography.styled";
import { FormController, Input, Error } from "../shared/styles/Form.styled";
import { Button } from "../shared/styles/Table.styled";

const RegisterSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password tem que, ter pelo menos, 6 caracteres")
    .required("Password é obrigatória"),
});

const RegisterPage = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [setPass, isSettingPass] =
    useMutation<RegisterPageMutation>(REGISTER_MUTATION);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = async (values: RegisterFormData) => {
    setPass({
      variables: {
        token: token!,
        password: values.password,
      },
      onCompleted: (response: RegisterPageMutation$data) => {
        if (response.setPassword) {
          navigate("/");
        }
      },
      onError: () => {
        setError("root", {
          type: "manual",
          message: "Erro ao definir password",
        });
      },
    });
  };

  return (
    <Container>
      <Content>
        <Title className="montserrat-bold">Definir Password</Title>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormController>
            <label htmlFor="password" className="montserrat-bold">
              PASS
            </label>
            <Input
              id="password"
              type="password"
              className="montserrat"
              hasError={!!errors.password}
              {...register("password")}
            />
            {errors.password && (
              <Error className="montserrat-bold">
                {errors.password.message}
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
            disabled={isSubmitting || isSettingPass}
            className="montserrat-bold"
          >
            {isSubmitting || isSettingPass ? (
              <Loader size={25} color="black" />
            ) : (
              "LOGIN"
            )}
          </Button>
        </form>
      </Content>
    </Container>
  );
};

export default RegisterPage;
