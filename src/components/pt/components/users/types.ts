import type { PreloadedQuery } from "react-relay";
import type {
  UsersQuery,
  UserStatus,
} from "../../../../__generated__/UsersQuery.graphql";
import type { Users$data } from "../../../../__generated__/Users.graphql";
import type React from "react";

export type User = NonNullable<Users$data["adminUsers"]["edges"]["0"]["node"]>;

export type UsersProps = {
  queryRef: PreloadedQuery<UsersQuery>;
  searchStatus: UserStatus | "";
  setSearchStatus: React.Dispatch<React.SetStateAction<UserStatus | "">>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<{ user: User | null } | null>
  >;
  setIsResendEmailOpen: React.Dispatch<React.SetStateAction<User | null>>;
  setIsDeleteModalOpen: React.Dispatch<
    React.SetStateAction<{
      user: User;
      action: "archive" | "deactivate" | "activate";
    } | null>
  >;
};

export type TableHeaderProps = {
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<{ user: User | null } | null>
  >;
};

export type UsersTableBodyProps = {
  queryRef: PreloadedQuery<UsersQuery>;
  searchTerm: string;
  searchStatus: UserStatus | "";
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<{ user: User | null } | null>
  >;
  setIsResendEmailOpen: React.Dispatch<React.SetStateAction<User | null>>;
  setIsDeleteModalOpen: React.Dispatch<
    React.SetStateAction<{
      user: User;
      action: "archive" | "deactivate" | "activate";
    } | null>
  >;
};

export type UsersModalProps = {
  searchTerm: string;
  searchStatus: UserStatus | "";
  user: User | null;
  onSubmit: () => void;
};

export type UserFormData = {
  name: string;
  email: string;
};

export type ResendEmailProps = {
  user: User;
  onResend: () => void;
};

export type DeleteUserProps = {
  user: User;
  action: "archive" | "deactivate" | "activate";
  onDelete: () => void;
};
