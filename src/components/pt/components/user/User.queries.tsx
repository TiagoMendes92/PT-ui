import { graphql } from "relay-runtime";

export const GET_USER = graphql`
  query UserQuery($id: String!) {
    adminUser(id: $id) {
      id
      email
      name
      status
      createdAt
      updatedAt
      userDetails {
        birthday
        height
        weight
        sex
        photographyUrl
        photographyKey
      }
    }
  }
`;
