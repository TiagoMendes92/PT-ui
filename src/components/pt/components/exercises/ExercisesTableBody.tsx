import EmptyCategory from "../categories/EmptyCategory";
import type { Category } from "../categories/types";
import { getCategoryChips, getYouTubeEmbedUrl } from "./utils";
import HighlightText from "../../../shared/highlight_text/HighlightText";
import { Chip, ChipsContainer } from "./Exercises.styles";
import {
  ActionButton,
  Actions,
  ImageCell,
} from "../categories/Categories.styles";
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

const ExercisesTableBody = ({
  categories,
  searchCat,
  searchTerm,
  setIsModalOpen,
  setIsDeleteModalOpen,
  exercisesQueryRef,
}: ExercisesTableBodyProps) => {
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
          <EmptyCategory nrOfCols={3} />
        ) : (
          data.exercises.edges.map((exercise) => {
            if (!exercise.node) return null;
            const chips = getCategoryChips(
              exercise.node,
              categories as Category[]
            );
            return (
              <tr key={exercise.node.id}>
                <td>
                  <HighlightText
                    text={exercise.node.name}
                    searchTerm={searchTerm}
                  />
                  <br />
                  <ChipsContainer>
                    {chips.map((c) => (
                      <Chip isActive={c.id === searchCat} key={c.id}>
                        {c.label}
                      </Chip>
                    ))}
                  </ChipsContainer>
                </td>
                <td>
                  <ImageCell>
                    <img src={exercise.node.photo?.url} />
                  </ImageCell>
                </td>
                <td>
                  <Actions>
                    <ActionButton onClick={() => checkVideo(exercise.node.url)}>
                      <img src={viewIcon} />
                    </ActionButton>
                    <ActionButton
                      onClick={() =>
                        setIsModalOpen({ exercise: exercise.node })
                      }
                    >
                      <img src={editIcon} alt="" />
                    </ActionButton>
                    <ActionButton
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
      {isLoadingNext ? <Spinner size={25} color="white" /> : null}
      {hasNext && !isLoadingNext ? (
        <button onClick={() => loadNext(10)}>Load more</button>
      ) : null}
      {showVideo &&
        createPortal(
          <Modal title="Video" onDismiss={() => setShowVideo(null)}>
            <Video url={showVideo} />
          </Modal>,
          document.body
        )}
    </>
  );
};

export default ExercisesTableBody;
