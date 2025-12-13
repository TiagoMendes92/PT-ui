import styled, { css } from "styled-components";
import {
  ActionButton,
  Table,
  TableActions,
} from "../../../shared/styles/Table.styled";
import { Input } from "../../../shared/styles/Form.styled";

export const ExerciseTable = styled(Table)`
  .name {
    width: calc(100% - 165px);
  }
  .categories {
    display: none;
  }
  .image {
    display: none;
  }
  .actions {
    width: 165px;
  }

  @media (min-width: 576px) {
    .name {
      width: calc(50% - 82.5px);
    }
    .image {
      width: calc(50% - 82.5px);
      display: table-cell;
    }
  }

  @media (min-width: 1200px) {
    .name {
      width: calc(33% - 55px);
    }
    .image {
      width: calc(33% - 55px);
    }
    .categories {
      width: calc(33% - 55px);
      display: table-cell;
    }
  }
`;

export const ExerciseActions = styled(TableActions)`
  display: flex;
  flex-direction: column;

  > div {
    width: 100%;
    max-width: unset;
  }

  @media (min-width: 576px) {
    flex-direction: row;

    > div {
      width: 50%;
      max-width: 350px;
    }
  }
`;

export const VerifyButton = styled(ActionButton)`
  right: 0px;
  top: 29px;
  width: 45px;
  height: 38px;
  position: absolute;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;

  img {
    height: 20px;
  }
`;

export const VideoInput = styled(Input)`
  padding-right: 55px;
`;

export const ChipsContainer = styled("div")`
  gap: 5px;
  display: flex;
  margin-top: 5px;
  flex-wrap: wrap;
`;

export const Chip = styled("div").withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>`
  font-size: 10px;
  border: 1px solid white;
  padding: 2px 8px;
  border-radius: 9px;

  ${({ isActive }) =>
    isActive
      ? css`
          background: white;
          color: black;
        `
      : css`
          background: black;
          color: white;
        `};
`;
