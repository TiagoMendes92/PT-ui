import { usePaginationFragment, usePreloadedQuery } from "react-relay";
import type { TemplatesGridProps } from "./TemplatePicker.types";
import type { TemplatesQuery } from "../../../__generated__/TemplatesQuery.graphql";
import {
  GET_TEMPLATES,
  GET_TEMPLATES_LIST,
} from "../../pt/components/templates/Templates.queries";
import type { Templates$key } from "../../../__generated__/Templates.graphql";
import EmptyCategory from "../../pt/components/categories/EmptyCategory";

import HighlightText from "../highlight_text/HighlightText";
import { ActionButton, LoadMoreButton } from "../styles/Table.styled";
import Spinner from "../loader/Loader";
import {
  TemplateCard,
  TemplateCardHeader,
  TemplateList,
} from "./TemplateGrid.styled";
import {
  GridCardTitle,
  GridImage,
} from "../../pt/components/templates/Templates.styled";

const TemplatesGrid = ({
  queryRef,
  searchTerm,
  onChange,
}: TemplatesGridProps) => {
  const query = usePreloadedQuery<TemplatesQuery>(GET_TEMPLATES, queryRef);

  const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment<
    TemplatesQuery,
    Templates$key
  >(GET_TEMPLATES_LIST, query);

  return (
    <>
      {!data.templates.edges.length ? (
        <EmptyCategory />
      ) : (
        <TemplateList>
          {data.templates.edges.map(({ node: template }) =>
            !template ? null : (
              <TemplateCard key={template.id}>
                <TemplateCardHeader>
                  <GridImage>
                    <img src={template.photo?.url} />
                  </GridImage>
                  <GridCardTitle className="montserrat-bold">
                    <HighlightText
                      text={template.name}
                      searchTerm={searchTerm}
                    />
                  </GridCardTitle>
                  <ActionButton
                    action="edit"
                    onClick={() => onChange(template)}
                  >
                    <img src="/plus.svg" />
                  </ActionButton>
                </TemplateCardHeader>
                <ol className="montserrat">
                  {template.exercises.map((exercise) => (
                    <li key={`${template.id}-${exercise.exercise.id}`}>
                      {exercise.exercise.name}
                    </li>
                  ))}
                </ol>
              </TemplateCard>
            )
          )}
        </TemplateList>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        {isLoadingNext ? <Spinner size={25} color="white" /> : null}
        {hasNext && !isLoadingNext ? (
          <LoadMoreButton onClick={() => loadNext(10)}>
            <img src="/load-more.svg" />
            LOAD MORE
          </LoadMoreButton>
        ) : null}
      </div>
    </>
  );
};

export default TemplatesGrid;
