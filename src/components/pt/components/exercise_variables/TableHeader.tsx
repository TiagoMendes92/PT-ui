import type { TableHeaderProps } from "./type";
import {
  AddButton,
  TableHeaderFirstLine,
  TableHeader as THeader,
} from "../../../shared/styles/Table.styled";
import { Title } from "../../../shared/styles/Typography.styled";

const TableHeader = ({ setIsModalOpen }: TableHeaderProps) => {
  return (
    <THeader>
      <TableHeaderFirstLine>
        <Title>Variaveis de Exercícios</Title>
        <AddButton onClick={() => setIsModalOpen({ exerciseVariable: null })}>
          <span>CRIAR VARIÁVEL</span>
          <img src="/plus.svg" />
        </AddButton>
      </TableHeaderFirstLine>
    </THeader>
  );
};
export default TableHeader;
