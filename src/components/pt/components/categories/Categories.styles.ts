import styled from "styled-components";
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

export const Table = styled("table")`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;

  th,
  td {
    padding: 5px;
    text-align: start;
    border: 1px solid white;
  }
`;

export const CatName = styled("div")`
  gap: 5px;
  display: flex;

  button {
    width: 22px;
    color: white;
    border: unset;
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
  width: 45px;
  font-size: 40px;
`;

export const Search = styled("div")`
  position: relative;
`;

export const SearchInput = styled(Input)`
  margin-bottom: 10px;
  border: 1px solid white;
`;

export const SearchButton = styled(Button)`
  right: 0;
  top: 10px;
  width: 45px;
  height: 38px;
  position: absolute;

  img {
    height: 20px;
  }
`;

export const Form = styled("form")`
  input {
    width: -webkit-fill-available;
  }
`;

export const Actions = styled("div")`
  gap: 5px;
  display: flex;
`;

export const ActionButton = styled(Button)`
  width: 35px;
  height: 23px;

  img {
    width: 15px;
  }
`;

export const DeleteModalContent = styled("div")`
  color: white;
  overflow: auto;
  margin-bottom: 30px;
  max-height: calc(100vh - 250px);
`;
