import EmptyCategory from "../categories/EmptyCategory";
import type { Category } from "../categories/types";
import { getCategoryChips, getYouTubeEmbedUrl } from "./utils";
import HighlightText from "../../../shared/highlight_text/HighlightText";
import { Chip, ChipsContainer } from "./Exercises.styled";
import { ImageCell } from "../categories/Categories.styled";
import type { ExercisesTableBodyProps } from "./types";
import editIcon from "../../../../icons/edit.svg";
import deleteIcon from "../../../../icons/delete.svg";
import { usePaginationFragment, usePreloadedQuery } from "react-relay";
import type { ExerciseQuery } from "../../../../__generated__/ExerciseQuery.graphql";
import { GET_EXERCISES, GET_EXERCISES_LIST } from "./Exercise.queries";
import type { Exercise$key } from "../../../../__generated__/Exercise.graphql";
import Spinner from "../../../shared/loader/Loader";
import viewIcon from "../../../../icons/eye.svg";
import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "../../../shared/modal/Modal";
import Video from "./Video";
import {
  ActionButton,
  Actions,
  LoaderContainer,
  LoadMoreButton,
  LoadMoreButtonContainer,
} from "../../../shared/styles/Table.styled";
import {
  DismissButton,
  ModalActions,
} from "../../../shared/modal/Modal.styles";
import useIsMobile from "../../../../hooks/useIsMobile";

const ExercisesTableBody = ({
  categories,
  searchCat,
  searchTerm,
  setIsModalOpen,
  setIsDeleteModalOpen,
  exercisesQueryRef,
}: ExercisesTableBodyProps) => {
  const isMobile = useIsMobile(576);
  const isDesktop = useIsMobile(1200);
  const [showVideo, setShowVideo] = useState<string | null>(null);
  const query = usePreloadedQuery<ExerciseQuery>(
    GET_EXERCISES,
    exercisesQueryRef
  );
  const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment<
    ExerciseQuery,
    Exercise$key
  >(GET_EXERCISES_LIST, query);

  const validateAndGetEmbedUrl = (exercise_url: string): string | null => {
    if (!exercise_url) {
      alert("INVALID URL");
      return null;
    }

    const url = getYouTubeEmbedUrl(exercise_url);

    if (!url) {
      alert("INVALID URL");
      return null;
    }

    return url;
  };

  const checkVideo = (exercise_url: string) => {
    const url = validateAndGetEmbedUrl(exercise_url);
    if (!url) return;

    setShowVideo(url);
  };

  return (
    <>
      <tbody>
        {!data.exercises.edges.length ? (
          <EmptyCategory nrOfCols={isMobile ? 2 : isDesktop ? 3 : 4} />
        ) : (
          data.exercises.edges.map((exercise) => {
            if (!exercise.node) return null;
            const chips = getCategoryChips(
              exercise.node,
              categories as Category[]
            );
            return (
              <tr key={exercise.node.id}>
                <td className="name">
                  <HighlightText
                    text={exercise.node.name}
                    searchTerm={searchTerm}
                  />
                  {isDesktop && (
                    <>
                      <br />
                      <ChipsContainer>
                        {chips.map((c) => (
                          <Chip isActive={c.id === searchCat} key={c.id}>
                            {c.label}
                          </Chip>
                        ))}
                      </ChipsContainer>
                    </>
                  )}
                </td>
                <td className="categories">
                  <ChipsContainer>
                    {chips.map((c) => (
                      <Chip isActive={c.id === searchCat} key={c.id}>
                        {c.label}
                      </Chip>
                    ))}
                  </ChipsContainer>
                </td>
                <td className="image">
                  <ImageCell>
                    <img src={exercise.node.photo?.url} />
                  </ImageCell>
                </td>
                <td className="actions">
                  <Actions>
                    <ActionButton
                      action="view"
                      onClick={() => checkVideo(exercise.node.url)}
                    >
                      <img src={viewIcon} />
                    </ActionButton>
                    <ActionButton
                      action="edit"
                      onClick={() =>
                        setIsModalOpen({ exercise: exercise.node })
                      }
                    >
                      <img src={editIcon} alt="" />
                    </ActionButton>
                    <ActionButton
                      action="delete"
                      onClick={() => setIsDeleteModalOpen(exercise.node)}
                    >
                      <img src={deleteIcon} alt="" />
                    </ActionButton>
                  </Actions>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
      {isLoadingNext ? (
        <LoaderContainer>
          <td colSpan={3}>
            <Spinner />
          </td>
        </LoaderContainer>
      ) : null}
      {hasNext && !isLoadingNext ? (
        <LoadMoreButtonContainer>
          <td colSpan={3}>
            <div>
              <LoadMoreButton onClick={() => loadNext(10)}>
                <img src="/load-more.svg" />
                LOAD MORE
              </LoadMoreButton>
            </div>
          </td>
        </LoadMoreButtonContainer>
      ) : null}
      {showVideo &&
        createPortal(
          <Modal
            title="Video"
            onDismiss={() => setShowVideo(null)}
            style={{ "max-width": "560px" }}
          >
            <Video url={showVideo} />
            <ModalActions>
              <DismissButton onClick={() => setShowVideo(null)}>
                FECHAR
              </DismissButton>
            </ModalActions>
          </Modal>,
          document.body
        )}
    </>
  );
};

export default ExercisesTableBody;
