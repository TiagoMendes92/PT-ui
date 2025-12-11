import type { TableHeaderProps } from "./types";
import {
  AddButton,
  TableHeader as THeader,
  TableHeaderFirstLine,
} from "../../../shared/styles/Table.styled";

import { Title } from "../../../shared/styles/Typography.styled";

const TableHeader = ({ setIsModalOpen }: TableHeaderProps) => {
  return (
    <THeader>
      <TableHeaderFirstLine>
        <Title>Treinos</Title>
        <AddButton onClick={() => setIsModalOpen({ template: null })}>
          <span>CRIAR TREINO</span>
          <img src="/plus.svg" />
        </AddButton>
      </TableHeaderFirstLine>
    </THeader>
  );
};

export default TableHeader;
