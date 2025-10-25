import { graphql } from "relay-runtime";

export const LOGIN_MUTATION = graphql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        name
        role
      }
    }
  }
`;
