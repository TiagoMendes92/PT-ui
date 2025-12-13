import type { PreloadedQuery } from "react-relay";
import type { TemplatesQuery } from "../../../__generated__/TemplatesQuery.graphql";
import type { Template } from "../../pt/components/templates/Templates.types";

export type TemplateLoaderProps = {
  onChange: (template: Template) => void;
};

export type TemplatePickerProps = TemplateLoaderProps & {
  searchTerm: string;
  queryRef: PreloadedQuery<TemplatesQuery>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export type TemplatesGridProps = TemplateLoaderProps & {
  searchTerm: string;
  queryRef: PreloadedQuery<TemplatesQuery>;
};
