import styled, { css } from "styled-components";
import { Input } from "./Form.styled";

export const TableHeader = styled("div")`
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

export const TableHeaderFirstLine = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Thead = styled("thead")`
  th {
    text-align: start;
    padding: 15px 25px;
    background: #f5f6f9;
  }
`;

export const LoaderContainer = styled("tr")`
  td {
    > div {
      margin-inline: auto;
    }
  }
`;

export const TablePageWrapper = styled("div")`
  height: 100%;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    overflow: auto;
    padding: 40px;
  }
`;

export const TablePageContent = styled("div")`
  flex: 1;
`;

export const TableContainer = styled("div")`
  margin-top: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

export const Table = styled("table")`
  width: 100%;
  border: none;
  font-size: 14px;
  table-layout: fixed;
  border-collapse: collapse;

  tr:not(:last-of-type) {
    td {
      border-bottom: 1px solid lightgray;
    }
  }

  td {
    overflow: hidden;
    padding: 15px 25px;

    span {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      display: inline-block;
      text-overflow: ellipsis;
    }
  }
`;

export const TableActions = styled("div")`
  padding: 20px;
  display: flex;
  gap: 20px;
`;

export const Search = styled("div")`
  flex: 1;
  width: 100%;
  max-width: 350px;
  position: relative;
`;

export const SearchInput = styled(Input)`
  margin: 0;
  padding-inline: 15px 40px;
`;

export const SearchIcon = styled("div")`
  top: 1px;
  right: 3px;
  width: 37px;
  height: 36px;
  display: flex;
  position: absolute;
  border-radius: 50%;
  align-items: center;
  justify-content: center;

  img {
    height: 16px;
    filter: invert(0.6);
  }
`;

export const Button = styled("button")`
  gap: 10px;
  width: 100%;
  color: white;
  padding: 6px;
  height: 36px;
  display: flex;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  background: #0047f9;
  align-items: center;
  border: 1px solid #0047f9;
  justify-content: center;
  border-radius: 8px;
  letter-spacing: 0.75px;
  font-variant: small-caps;
  transition: background 0.3s ease;

  &:hover:not(:disabled) {
    color: #0047f9;
    background: white;
  }

  img {
    width: 17px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const CancelButton = styled(Button)`
  color: white;
  background: black;
`;

export const AddButton = styled(Button)`
  width: 40px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  img {
    filter: grayscale(1) contrast(3) invert(1);
  }

  &:hover:not(:disabled) {
    img {
      filter: unset;
    }
  }

  > span {
    display: none;
  }

  @media (min-width: 576px) {
    width: auto;
    padding-inline: 12px;
    > span {
      display: block;
    }
  }
`;

export const LoadMoreButtonContainer = styled("tr")`
  td {
    padding: 0;
    div {
      height: 0;
      display: flex;
      overflow: visible;
      justify-content: center;
    }
  }
`;

export const LoadMoreButton = styled(Button)`
  width: 140px;
  transform: translateY(20px);
  background: white;
  color: #0047f9;

  &:hover:not(:disabled) {
    color: white;
    background: #0047f9;

    img {
      filter: grayscale(1) contrast(3) invert(1);
    }
  }
`;

export const Actions = styled("div")`
  gap: 5px;
  display: flex;
`;

export const ActionButton = styled(Button).withConfig({
  shouldForwardProp: (prop) => prop !== "action",
})<{ action: "view" | "edit" | "delete" }>`
  width: 35px;
  background: white;

  ${({ action }) =>
    action === "delete"
      ? css`
          border-color: #f55367;
          &:hover:not(:disabled) {
            background: #f55367;

            img {
              filter: brightness(10);
            }
          }
        `
      : action === "view"
      ? css`
          border-color: #3cd8b2;
          &:hover:not(:disabled) {
            background: #3cd8b2;

            img {
              filter: grayscale(1) contrast(4) invert(0);
            }
          }
        `
      : css`
          border-color: #5c7df9;
          &:hover:not(:disabled) {
            background: #5c7df9;

            img {
              filter: brightness(10);
            }
          }
        `};
`;
