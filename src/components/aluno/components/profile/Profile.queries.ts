import { graphql } from "relay-runtime";

export const GET_PROFILE = graphql`
  query ProfileQuery($user_id: ID!) {
    userDetails(user_id: $user_id) {
      id
      birthday
      height
      weight
      sex
      photographyUrl
      photographyKey
    }
  }
`;

export const UPDATE_PROFILE = graphql`
  mutation ProfileMutation(
    $birthday: String
    $height: Int
    $weight: Int
    $sex: String
  ) {
    updateUserDetails(
      birthday: $birthday
      height: $height
      weight: $weight
      sex: $sex
    ) {
      id
      birthday
      height
      weight
      sex
    }
  }
`;

export const UPLOAD_PROFILE_PHOTO = graphql`
  mutation ProfilePhotoMutation($file: Upload!) {
    uploadProfilePhoto(file: $file) {
      id
      photographyUrl
      photographyKey
    }
  }
`;
