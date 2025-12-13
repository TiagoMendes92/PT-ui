import { useQueryLoader } from "react-relay";
import type { TemplatesQuery } from "../../../__generated__/TemplatesQuery.graphql";
import { GET_TEMPLATES } from "../../pt/components/templates/Templates.queries";
import { Suspense, useEffect, useState } from "react";
import type {
  TemplateLoaderProps,
  TemplatePickerProps,
} from "./TemplatePicker.types";
import { Search, SearchIcon, SearchInput } from "../styles/Table.styled";
import searchIcon from "../../../icons/search.svg";
import TemplatesGrid from "./TemplateGrid";

const TemplatePicker = ({
  onChange,
  queryRef,
  searchTerm,
  setSearchTerm,
}: TemplatePickerProps) => {
  const [localSearchTerm, setLocalSearchTerm] = useState<string>("");
  const handleSearch = () => {
    setSearchTerm(localSearchTerm);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== undefined) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, handleSearch]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <Search style={{ marginBottom: "10px" }}>
        <SearchInput
          hasError={false}
          placeholder="Pesquisar por nome..."
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          onKeyUp={handleKeyPress}
        />
        <SearchIcon>
          <img src={searchIcon} />
        </SearchIcon>
      </Search>
      <Suspense fallback="LOADING">
        <TemplatesGrid
          searchTerm={searchTerm}
          queryRef={queryRef}
          onChange={onChange}
        />
      </Suspense>
    </>
  );
};

const Loader = ({ onChange }: TemplateLoaderProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [queryRef, fetchData] = useQueryLoader<TemplatesQuery>(GET_TEMPLATES);

  useEffect(() => {
    fetchData({
      first: 10,
      searchTerm,
    });
  }, [searchTerm]);

  return queryRef ? (
    <TemplatePicker
      onChange={onChange}
      queryRef={queryRef}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />
  ) : null;
};

export default Loader;
