import { Title } from "../../../login/LoginPage.styles";
import type { TableHeaderProps } from "./type";
import {
  AddButton,
  Search,
  SearchButton,
  SearchInput,
  TableHeader as THeader,
  TableHeaderFirstLine,
} from "../categories/Categories.styles";
import searchIcon from "../../../../icons/search.svg";

const TableHeader = ({
  onSearch,
  searchTerm,
  setSearchTerm,
  setIsModalOpen,
}: TableHeaderProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <THeader>
      <TableHeaderFirstLine>
        <Title>Variaveis de Exercícios</Title>
        <AddButton onClick={() => setIsModalOpen({ exerciseVariable: null })}>
          +
        </AddButton>
      </TableHeaderFirstLine>
      <Search>
        <SearchInput
          hasError={false}
          placeholder="Pesquisar por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={handleKeyPress}
        />
        <SearchButton onClick={onSearch}>
          <img src={searchIcon} />
        </SearchButton>
      </Search>
    </THeader>
  );
};
export default TableHeader;
