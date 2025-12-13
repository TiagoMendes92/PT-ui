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
        <Title>Alunos</Title>
        <AddButton onClick={() => setIsModalOpen({ user: null })}>
          CRIAR ALUNO
          <img src="/plus.svg" />
        </AddButton>
      </TableHeaderFirstLine>
    </THeader>
  );
};

export default TableHeader;
