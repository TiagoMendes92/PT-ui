import { graphql } from "relay-runtime";

export const GET_EXERCISES = graphql`
  query ExerciseQuery($first: Int, $category: String, $searchTerm: String) {
    ...Exercise
      @arguments(first: $first, category: $category, searchTerm: $searchTerm)
  }
`;

export const GET_EXERCISES_LIST = graphql`
  fragment Exercise on Query
  @argumentDefinitions(
    first: { type: "Int" }
    after: { type: "String" }
    category: { type: "String" }
    searchTerm: { type: "String" }
  )
  @refetchable(queryName: "ExercisesPaginatedQuery") {
    exercises(
      first: $first
      after: $after
      category: $category
      searchTerm: $searchTerm
    ) @connection(key: "ExercisesPaginatedQuery_exercises") {
      edges {
        node {
          id
          name
          url
          category
          allCategories {
            id
            name
          }
          photo {
            url
            key
          }
          createdAt
          updatedAt
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

export const EXERCISE_CREATE = graphql`
  mutation ExerciseCreateMutation(
    $exercise: ExerciseInput!
    $connections: [ID!]!
    $file: Upload
  ) {
    addExercise(exercise: $exercise, file: $file)
      @prependNode(connections: $connections, edgeTypeName: "ExerciseEdge") {
      id
      url
      name
      category
      allCategories {
        id
        name
      }
      photo {
        url
        key
      }
      createdAt
      updatedAt
    }
  }
`;

export const EXERCISE_EDIT = graphql`
  mutation ExerciseEditMutation(
    $exercise: ExerciseInputWithId!
    $file: Upload
  ) {
    editExercise(exercise: $exercise, file: $file) {
      id
      url
      name
      category
      allCategories {
        id
        name
      }
      photo {
        url
        key
      }
      createdAt
      updatedAt
    }
  }
`;

export const EXERCISE_DELETE = graphql`
  mutation ExerciseDeleteMutation($id: String!) {
    deleteExercise(id: $id) @deleteRecord
  }
`;
