import { Title } from "../../../login/LoginPage.styles";
import {
  AddButton,
  Search,
  SearchButton,
  SearchInput,
  TableHeader as THeader,
  TableHeaderFirstLine,
} from "../categories/Categories.styles";
import searchIcon from "../../../../icons/search.svg";
import type { TableHeaderProps } from "./types";
import type { SelectOption } from "../../../shared/select/types";
import Select from "../../../shared/select/Select";

const TableHeader = ({
  categories,
  searchCat,
  setSearchCat,
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

  const categoryOptions = categories.reduce((acc, category) => {
    acc.push({
      value: category.id,
      label: category.name,
    });

    if (category.subcategories && category.subcategories.length > 0) {
      category.subcategories.forEach((sub) => {
        acc.push({
          value: sub.id,
          label: `${category.name} - ${sub.name}`,
        });
      });
    }

    return acc;
  }, [] as SelectOption[]);

  return (
    <THeader>
      <TableHeaderFirstLine>
        <Title>Exercícios</Title>
        <AddButton onClick={() => setIsModalOpen({ exercise: null })}>
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
      <Select
        style={{ border: "1px solid white" }}
        options={categoryOptions}
        value={searchCat}
        onChange={(e) => {
          setSearchCat(e);
        }}
        placeholder="Selecionar categoria"
        hasError={false}
      />
    </THeader>
  );
};

export default TableHeader;
