import type { PreloadedQuery } from "react-relay";
import type { HeaderLink } from "../header/types";
import type { ProfileQuery } from "../../../__generated__/ProfileQuery.graphql";
import type { User } from "../../app/AuthContent.context";

export type SidebarProps = SidebarLoaderProps & {
  user: User;
  queryRef: PreloadedQuery<ProfileQuery>;
};

export type SidebarLoaderProps = {
  links: HeaderLink[];
};
