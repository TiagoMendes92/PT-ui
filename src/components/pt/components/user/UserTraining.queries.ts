import { graphql } from "relay-runtime";

export const TRAININGS_QUERY = graphql`
  query UserTrainingQuery($target_id: String!) {
    trainings(target_id: $target_id) {
      id
      name
      description
      photo {
        url
        key
      }
      createdAt
      updatedAt
      exercises {
        orderPosition
        exercise {
          id
          name
          url
          category
          photo {
            url
            key
          }
        }
        sets {
          setNumber
          variables {
            id
            variable {
              id
              name
              unit
            }
            targetValue
          }
        }
      }
    }
  }
`;

export const TRAINING_CREATE = graphql`
  mutation UserTrainingCreateMutation(
    $input: CreateTrainingInput!
    $file: Upload
  ) {
    createTraining(input: $input, file: $file) {
      id
      name
      description
      createdAt
      updatedAt
      exercises {
        orderPosition
        exercise {
          id
          name
          url
          category
          photo {
            url
            key
          }
        }
        sets {
          setNumber
          variables {
            variable {
              id
              name
              unit
            }
            targetValue
          }
        }
      }
    }
  }
`;

export const TRAINING_EDIT = graphql`
  mutation UserTrainingUpdateMutation($input: UpdateTrainingInput!) {
    editTraining(input: $input) {
      id
      name
      description
      createdAt
      updatedAt
      exercises {
        orderPosition
        exercise {
          id
          name
          url
          category
          photo {
            url
            key
          }
        }
        sets {
          setNumber
          variables {
            variable {
              id
              name
              unit
            }
            targetValue
          }
        }
      }
    }
  }
`;
