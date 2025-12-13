import { graphql } from "relay-runtime";

export const TRAININGS_QUERY = graphql`
  query UserTrainingQuery($target_id: String!) {
    trainings(target_id: $target_id) {
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

export const TRAINING_CREATE = graphql`
  mutation UserTrainingCreateMutation($input: CreateTrainingInput!) {
    createTraining(input: $input) {
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
