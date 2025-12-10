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
        <Title>Categorias</Title>
        <AddButton onClick={() => setIsModalOpen({ category: null })}>
          <span>CRIAR CATEGORIA</span>
          <img src="/plus.svg" />
        </AddButton>
      </TableHeaderFirstLine>
    </THeader>
  );
};

export default TableHeader;
