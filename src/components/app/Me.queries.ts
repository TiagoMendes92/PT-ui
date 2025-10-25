import { graphql } from "relay-runtime";

export const ME_QUERY = graphql`
  query MeQuery {
    me {
      id
      email
      name
      role
    }
  }
`;
