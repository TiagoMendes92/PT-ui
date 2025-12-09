import { graphql } from "relay-runtime";

export const GET_TEMPLATES = graphql`
  query TemplatesQuery($first: Int, $searchTerm: String) {
    ...Templates @arguments(first: $first, searchTerm: $searchTerm)
  }
`;

export const GET_TEMPLATES_LIST = graphql`
  fragment Templates on Query
  @argumentDefinitions(
    first: { type: "Int" }
    after: { type: "String" }
    searchTerm: { type: "String" }
  )
  @refetchable(queryName: "TemplatesPaginatedQuery") {
    templates(first: $first, after: $after, searchTerm: $searchTerm)
      @connection(key: "TemplatesPaginatedQuery_templates") {
      edges {
        node {
          id
          name
          description
          createdAt
          updatedAt
          photo {
            url
            key
          }
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
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const TEMPLATES_CREATE = graphql`
  mutation TemplatesCreateMutation(
    $input: CreateTemplateInput!
    $connections: [ID!]!
    $file: Upload
  ) {
    createTemplate(input: $input, file: $file)
      @prependNode(connections: $connections, edgeTypeName: "TemplateEdge") {
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

export const TEMPLATES_EDIT = graphql`
  mutation TemplatesEditMutation($input: UpdateTemplateInput!, $file: Upload) {
    updateTemplate(input: $input, file: $file) {
      id
      name
      description
      createdAt
      updatedAt
      photo {
        url
        key
      }
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

export const TEMPLATE_DELETE = graphql`
  mutation TemplatesDeleteMutation($id: String!) {
    deleteTemplate(id: $id) @deleteRecord
  }
`;
