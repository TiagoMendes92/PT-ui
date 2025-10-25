import { graphql } from "relay-runtime";

export const GET_USERS = graphql`
  query UsersQuery($first: Int, $filter: AdminUserFilterInput) {
    ...Users @arguments(first: $first, filter: $filter)
  }
`;

export const GET_USERS_LIST = graphql`
  fragment Users on Query
  @argumentDefinitions(
    first: { type: "Int" }
    after: { type: "String" }
    filter: { type: "AdminUserFilterInput" }
  )
  @refetchable(queryName: "UsersPaginatedQuery") {
    adminUsers(first: $first, after: $after, filter: $filter)
      @connection(key: "UsersPaginatedQuery_adminUsers") {
      edges {
        node {
          id
          email
          name
          status
          createdAt
          updatedAt
          deactivatedAt
          passwordSetAt
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const USER_CREATE = graphql`
  mutation UsersCreateMutation($user: AdminUserInput!, $connections: [ID!]!) {
    addUser(user: $user)
      @prependNode(connections: $connections, edgeTypeName: "AdminUserEdge") {
      id
      email
      name
      status
      createdAt
      updatedAt
      deactivatedAt
      passwordSetAt
    }
  }
`;

export const USER_EDIT = graphql`
  mutation UsersEditMutation($user: AdminUserInputWithId!) {
    editUser(user: $user) {
      id
      email
      name
      status
      createdAt
      updatedAt
      deactivatedAt
      passwordSetAt
    }
  }
`;

export const RESEND_EMAIL = graphql`
  mutation UsersResendEmailMutation($userId: ID!) {
    resendRegistrationEmail(userId: $userId) {
      success
    }
  }
`;

export const USER_ACTIVATE = graphql`
  mutation UsersActivateMutation($id: String!) {
    activateUser(id: $id) {
      id
      email
      name
      status
      createdAt
      updatedAt
      deactivatedAt
      passwordSetAt
    }
  }
`;

export const USER_DEACTIVATE = graphql`
  mutation UsersDeactivateMutation($id: String!) {
    deactivateUser(id: $id) {
      id
      email
      name
      status
      createdAt
      updatedAt
      deactivatedAt
      passwordSetAt
    }
  }
`;

export const USER_DELETE = graphql`
  mutation UsersDeleteMutation($id: String!) {
    deleteUser(id: $id) @deleteRecord
  }
`;
