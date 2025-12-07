import { usePaginationFragment, usePreloadedQuery } from "react-relay";
import {
  Grid,
  GridCard,
  GridCardActions,
  GridCardHeader,
  GridCardTitle,
} from "./Templates.styles";
import type { TemplatesGridProps } from "./types";
import type { TemplatesQuery } from "../../../../__generated__/TemplatesQuery.graphql";
import { GET_TEMPLATES, GET_TEMPLATES_LIST } from "./Templates.queries";
import type { Templates$key } from "../../../../__generated__/Templates.graphql";
import EmptyCategory from "../categories/EmptyCategory";
import { ActionButton } from "../categories/Categories.styles";
import deleteIcon from "../../../../icons/delete.svg";
import Spinner from "../../../shared/loader/Loader";
import editIcon from "../../../../icons/edit.svg";
import HighlightText from "../../../shared/highlight_text/HighlightText";

const TemplatesGrid = ({
  queryRef,
  searchTerm,
  setIsModalOpen,
  setIsDeleteModalOpen,
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
        <Grid>
          {data.templates.edges.map(({ node: template }) =>
            !template ? null : (
              <GridCard key={template.id}>
                <GridCardHeader>
                  <GridCardTitle>
                    <HighlightText
                      text={template.name}
                      searchTerm={searchTerm}
                    />
                  </GridCardTitle>
                  <GridCardActions>
                    <ActionButton
                      onClick={() => setIsModalOpen({ template: template })}
                    >
                      <img src={editIcon} alt="" />
                    </ActionButton>
                    <ActionButton
                      onClick={() => setIsDeleteModalOpen(template)}
                    >
                      <img src={deleteIcon} alt="" />
                    </ActionButton>
                  </GridCardActions>
                </GridCardHeader>
                <ol>
                  {template.exercises.map((exercise) => (
                    <li key={`${template.id}-${exercise.exercise.id}`}>
                      {exercise.exercise.name}
                    </li>
                  ))}
                </ol>
              </GridCard>
            )
          )}
        </Grid>
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
          <button onClick={() => loadNext(10)}>Load more</button>
        ) : null}
      </div>
    </>
  );
};

export default TemplatesGrid;
