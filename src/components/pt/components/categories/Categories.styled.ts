import styled from "styled-components";
import { Button, Table } from "../../../shared/styles/Table.styled";

export const CategoriesTable = styled(Table)`
  .name {
    width: calc(100% - 117px);
  }
  .image {
    display: none;
  }
  .actions {
    width: 125px;
  }

  @media (min-width: 490px) {
    .name {
      width: calc(50% - 62.5px);
    }

    .image {
      width: calc(50% - 62.5px);
      display: table-cell;
    }
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
    margin-left: 4px;
  }
`;

export const ImageCell = styled("div")`
  img {
    width: 100%;
    height: 100%;
    max-height: 75px;
    object-fit: contain;
    object-position: left;
  }
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
