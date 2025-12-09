import { Title } from "../../../login/LoginPage.styles";
import type { TableHeaderProps } from "./type";
import {
  AddButton,
  TableHeaderFirstLine,
  TableHeader as THeader,
} from "../categories/Categories.styles";

const TableHeader = ({ setIsModalOpen }: TableHeaderProps) => {
  return (
    <THeader>
      <TableHeaderFirstLine>
        <Title>Variaveis de Exercícios</Title>
        <AddButton onClick={() => setIsModalOpen({ exerciseVariable: null })}>
          CRIAR VARIÁVEL
          <img src="/plus.svg" />
        </AddButton>
      </TableHeaderFirstLine>
    </THeader>
  );
};
export default TableHeader;
