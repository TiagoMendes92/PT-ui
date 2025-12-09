import styled, { css } from "styled-components";
import { Button, Input } from "../../../login/LoginPage.styles";

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

export const Content = styled("div")`
  flex: 1;
`;

export const TableContainer = styled("div")`
  margin-top: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

export const TableActions = styled("div")`
  padding: 20px;
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
    padding: 15px 25px;
  }
`;

export const CatName = styled("div")`
  gap: 5px;
  display: flex;

  button {
    width: 22px;
    color: white;
    cursor: pointer;
    background: black;
    border: 1px solid white;

    &:hover {
      background: grey;
    }
  }
`;

export const SubCatName = styled("div")`
  gap: 8px;
  display: flex;

  img {
    width: 15px;
    filter: invert(1);
    margin-left: 4px;
  }
`;

export const ImageCell = styled("div")`
  img {
    width: 100%;
    height: 100%;
    max-height: 100px;
    object-fit: contain;
  }
`;

export const AddButton = styled(Button)`
  width: 170px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  img {
    filter: brightness(10);
  }

  &:hover:not(:disabled) {
    img {
      filter: unset;
    }
  }
`;

export const Search = styled("div")`
  flex: 1;
  max-width: 350px;
  position: relative;
`;

export const SearchInput = styled(Input)`
  margin: 0;
  padding-inline: 15px 40px;
`;

export const SearchButton = styled(Button)`
  top: 1px;
  right: 1px;
  width: 37px;
  height: 36px;
  position: absolute;
  border-radius: 50%;

  img {
    height: 16px;
    filter: invert(0.6);
  }
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

export const Form = styled("form")`
  padding-top: 30px;
  input {
    width: -webkit-fill-available;
  }
`;

export const Actions = styled("div")`
  gap: 5px;
  display: flex;
`;

export const ActionButton = styled(Button).withConfig({
  shouldForwardProp: (prop) => prop !== "action",
})<{ action: "edit" | "delete" }>`
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
      filter: brightness(10);
    }
  }
`;

export const DeleteModalContent = styled("div")`
  overflow: auto;
  font-size: 14px;
  color: #757575;
  line-height: 1.5;
  margin-top: 26px;

  margin-bottom: 30px;
  max-height: calc(100vh - 250px);
`;
