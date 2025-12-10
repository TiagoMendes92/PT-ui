import styled from "styled-components";
import { Table } from "../../../shared/styles/Table.styled";

export const ExerciseVariablesTable = styled(Table)`
  .name {
    width: calc(100% - 117px);
  }
  .unit {
    display: none;
  }
  .actions {
    width: 125px;
  }

  @media (min-width: 490px) {
    .name {
      width: 50%;
    }
    .unit {
      width: 50%;
      display: table-cell;
    }
  }

  @media (min-width: 1200px) {
    .name {
      width: 65%;
    }
    .unit {
      width: 35%;
    }
  }
`;
