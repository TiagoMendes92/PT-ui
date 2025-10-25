import { graphql } from "relay-runtime";

export const CATEGORIES_QUERY = graphql`
  query CategoriesQuery {
    categories {
      id
      name
      createdAt
      updatedAt
      parentCategory
      subcategories {
        id
        name
        createdAt
        updatedAt
        parentCategory
      }
    }
  }
`;

export const CATEGORY_CREATE = graphql`
  mutation CategoriesCreateMutation($cat: CategoryInput!) {
    addCategory(cat: $cat) {
      id
    }
  }
`;

export const CATEGORY_EDIT = graphql`
  mutation CategoriesEditMutation($cat: CategoryInputWithId!) {
    editCategory(cat: $cat) {
      id
      name
      parentCategory
      updatedAt
    }
  }
`;

export const CATEGORY_DELETE = graphql`
  mutation CategoriesDeleteMutation($id: String!) {
    deleteCategory(id: $id)
  }
`;
