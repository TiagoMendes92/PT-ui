import { graphql } from "relay-runtime";

export const GET_ALL_EXERCISE_VARIABLES = graphql`
  query ExerciseVariablesAllQuery {
    allVariables {
      id
      name
      unit
      createdAt
      updatedAt
      description
    }
  }
`;

export const GET_EXERCISE_VARIABLES = graphql`
  query ExerciseVariablesQuery($first: Int, $searchTerm: String) {
    ...ExerciseVariables @arguments(first: $first, searchTerm: $searchTerm)
  }
`;

export const GET_EXERCISE_VARIABLES_LIST = graphql`
  fragment ExerciseVariables on Query
  @argumentDefinitions(
    first: { type: "Int" }
    after: { type: "String" }
    searchTerm: { type: "String" }
  )
  @refetchable(queryName: "ExerciseVariablesPaginatedQuery") {
    exerciseVariables(first: $first, after: $after, searchTerm: $searchTerm)
      @connection(key: "ExerciseVariablesPaginatedQuery_exerciseVariables") {
      edges {
        node {
          id
          name
          unit
          createdAt
          updatedAt
          description
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

export const EXERCISE_VARIABLE_CREATE = graphql`
  mutation ExerciseVariablesCreateMutation(
    $variable: ExerciseVariableInput!
    $connections: [ID!]!
  ) {
    addExerciseVariable(variable: $variable)
      @prependNode(
        connections: $connections
        edgeTypeName: "ExerciseVariableEdge"
      ) {
      id
      name
      unit
      createdAt
      updatedAt
      description
    }
  }
`;

export const EXERCISE_VARIABLE_EDIT = graphql`
  mutation ExerciseVariablesEditMutation(
    $variable: ExerciseVariableInputWithId!
  ) {
    editExerciseVariable(variable: $variable) {
      id
      name
      unit
      createdAt
      updatedAt
      description
    }
  }
`;

export const EXERCISE_VARIABLE_DELETE = graphql`
  mutation ExerciseVariablesDeleteMutation($id: ID!) {
    deleteExerciseVariable(id: $id) @deleteRecord
  }
`;
