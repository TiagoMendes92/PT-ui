import type { PreloadedQuery } from "react-relay";
import type { ProfileQuery } from "../../../../__generated__/ProfileQuery.graphql";
import type { User } from "../../../app/AuthContent.context";

export type ProfileProps = {
  user: User;
  queryRef: PreloadedQuery<ProfileQuery>;
};

export type ProfileFormData = {
  birthday: string;
  height: number;
  weight: number;
  sex: string;
};
