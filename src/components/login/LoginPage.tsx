import { useMutation } from "react-relay/hooks";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LOGIN_MUTATION } from "./Login.queries";
import { useAuth } from "../app/AuthContent.context";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { LoginFormData } from "./types";

import { Container, Content } from "./LoginPage.styles";
import Loader from "../shared/loader/Loader";
import type {
  LoginMutation,
  LoginMutation$data,
} from "../../__generated__/LoginMutation.graphql";
import {
  FormController,
  Input,
  Error,
  Form,
} from "../shared/styles/Form.styled";
import { Button } from "../shared/styles/Table.styled";
import { Logo, Name } from "../shared/sidebar/Sidebar.styles";
import {
  ModalActions,
  ModalBody,
  ModalContainer,
  ModalHeader,
  SubTitle,
} from "../shared/modal/Modal.styles";

const LoginSchema = yup.object().shape({
  email: yup.string().email("E-mail inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .min(6, "Password tem que ter 6 caracteres")
    .required("Password é obrigatória"),
});

const LoginPage = () => {
  const [login, isLoggingIn] = useMutation<LoginMutation>(LOGIN_MUTATION);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (values: LoginFormData) => {
    login({
      variables: {
        email: values.email,
        password: values.password,
      },

      onCompleted: (response: LoginMutation$data) => {
        if (response.login) {
          authLogin(response.login.token, response.login.user);
          navigate("/");
        }
      },
      onError: () => {
        setError("root", {
          type: "manual",
          message: "Erro no login",
        });
      },
    });
  };

  return (
    <Container>
      <Logo>
        <img src="/logo.png" />
        <Name>
          <div>João Mendes</div>
          Personal Trainer
        </Name>
      </Logo>
      <Content>
        <ModalContainer style={{ height: "fit-content" }}>
          <ModalHeader>
            <SubTitle className="montserrat-bold">Login</SubTitle>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormController>
                <label htmlFor="email" className="montserrat-bold">
                  E-mail
                </label>
                <Input
                  id="email"
                  type="email"
                  className="montserrat"
                  hasError={!!errors.email}
                  placeholder="Escrever o e-mail..."
                  {...register("email")}
                />
                {errors.email && (
                  <Error className="montserrat-bold">
                    {errors.email.message}
                  </Error>
                )}
              </FormController>
              <FormController>
                <label htmlFor="password" className="montserrat-bold">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  className="montserrat"
                  hasError={!!errors.password}
                  placeholder="Escrever a password..."
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
              <ModalActions>
                <Button
                  type="submit"
                  disabled={isSubmitting || isLoggingIn}
                  className="montserrat-bold"
                >
                  {isSubmitting || isLoggingIn ? (
                    <Loader size={15} color="white" />
                  ) : (
                    "LOGIN"
                  )}
                </Button>
              </ModalActions>
            </Form>
          </ModalBody>
        </ModalContainer>
      </Content>
    </Container>
  );
};

export default LoginPage;
