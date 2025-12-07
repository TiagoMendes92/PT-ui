import {
  AddButton,
  Search,
  SearchButton,
  SearchInput,
  TableHeader as THeader,
  TableHeaderFirstLine,
} from "./Categories.styles";
import searchIcon from "../../../../icons/search.svg";
import { Title } from "../../../login/LoginPage.styles";
import type { TableHeaderProps } from "./types";

const TableHeader = ({
  searchTerm,
  onSearch,
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
        <Title>Categorias</Title>
        <AddButton onClick={() => setIsModalOpen({ category: null })}>
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
