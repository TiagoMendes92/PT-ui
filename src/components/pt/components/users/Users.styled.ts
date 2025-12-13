import styled, { css } from "styled-components";
import { Table } from "../../../shared/styles/Table.styled";
import type { UserStatus } from "../../../../__generated__/Users.graphql";

export const UsersTable = styled(Table)`
  .foto {
    width: 100px;
    display: none;

    img {
      width: 50px;
      height: 50px;
      overflow: hidden;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  .name {
    width: calc(100% - 165px);
  }
  .status {
    display: none;
  }
  .actions {
    width: 165px;
  }

  @media (min-width: 576px) {
    .name {
      width: calc(100% - 285px);
    }
    .status {
      width: 120px;
      display: table-cell;
    }
  }

  @media (min-width: 630px) {
    .name {
      width: calc(100% - 385px);
    }
    .foto {
      display: table-cell;
    }
    .status {
      width: 120px;
      display: table-cell;
    }
  }

  @media (min-width: 768px) {
    .foto {
      display: none;
    }
    .status {
      display: none;
    }
  }

  @media (min-width: 920px) {
    .status {
      display: table-cell;
    }
  }

  @media (min-width: 1044px) {
    .name {
      width: 65%;
    }
    .foto {
      display: table-cell;
    }
    .status {
      width: 35%;
      display: table-cell;
    }
  }
`;

export const UserRow = styled("tr")`
  cursor: pointer;

  &:hover {
    td {
      background: #c4cbf2;
    }
  }
`;
export const StatusPill = styled("div").withConfig({
  shouldForwardProp: (prop) => prop !== "status",
})<{ status: UserStatus }>`
  height: 20px;
  width: 70px;
  display: flex;
  font-size: 12px;
  text-align: center;
  border-radius: 10px;
  align-items: center;

  ${({ status }) =>
    status === "ACTIVE"
      ? css`
          color: white;
          background: #3cd8b2;
        `
      : status === "PENDING"
      ? css`
          color: white;
          background: #5c7df9;
        `
      : status === "DEACTIVATED"
      ? css`
          background: lightgrey;
        `
      : css``};
`;
