import { graphql } from "relay-runtime";

export const REGISTER_MUTATION = graphql`
  mutation RegisterPageMutation($token: String!, $password: String!) {
    setPassword(token: $token, password: $password) {
      success
    }
  }
`;
