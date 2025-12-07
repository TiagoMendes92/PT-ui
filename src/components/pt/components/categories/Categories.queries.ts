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
        photo {
          url
          key
        }
      }
      photo {
        url
        key
      }
    }
  }
`;

export const CATEGORY_CREATE = graphql`
  mutation CategoriesCreateMutation($cat: CategoryInput!, $file: Upload) {
    addCategory(cat: $cat, file: $file) {
      id
    }
  }
`;

export const CATEGORY_EDIT = graphql`
  mutation CategoriesEditMutation($cat: CategoryInputWithId!, $file: Upload) {
    editCategory(cat: $cat, file: $file) {
      id
      name
      parentCategory
      updatedAt
      photo {
        url
        key
      }
    }
  }
`;

export const CATEGORY_DELETE = graphql`
  mutation CategoriesDeleteMutation($id: String!) {
    deleteCategory(id: $id)
  }
`;
