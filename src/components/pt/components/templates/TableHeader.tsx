import type { TableHeaderProps } from "./types";
import {
  AddButton,
  Search,
  SearchButton,
  SearchInput,
  TableHeader as THeader,
  TableHeaderFirstLine,
} from "../categories/Categories.styles";
import { Title } from "../../../login/LoginPage.styles";
import searchIcon from "../../../../icons/search.svg";

const TableHeader = ({
  onSearch,
  searchTerm,
  setSearchTerm,
  setIsModalOpen,
}: TableHeaderProps) => {
  "use memo";

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };
  return (
    <THeader>
      <TableHeaderFirstLine>
        <Title>Templates</Title>
        <AddButton onClick={() => setIsModalOpen({ template: null })}>
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
