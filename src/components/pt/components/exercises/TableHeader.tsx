import {
  AddButton,
  TableHeader as THeader,
  TableHeaderFirstLine,
} from "../../../shared/styles/Table.styled";
import type { TableHeaderProps } from "./types";
import { Title } from "../../../shared/styles/Typography.styled";

const TableHeader = ({ setIsModalOpen }: TableHeaderProps) => {
  return (
    <THeader>
      <TableHeaderFirstLine>
        <Title>Exercícios</Title>
        <AddButton onClick={() => setIsModalOpen({ exercise: null })}>
          <span>CRIAR EXERCÍCIO</span>
          <img src="/plus.svg" />
        </AddButton>
      </TableHeaderFirstLine>
    </THeader>
  );
};

export default TableHeader;
