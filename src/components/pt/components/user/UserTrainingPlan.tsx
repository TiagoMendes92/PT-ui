import { usePreloadedQuery, useQueryLoader } from "react-relay";
import { ActionButton } from "../../../shared/styles/Table.styled";
import {
  UserNoTrainings,
  UserTrain,
  UserTrainHeader,
  UserTrainHeaderTitle,
  UserTrainingImage,
  UserTrainingPlanBody,
  UserTrainingPlanContainer,
  UserTrainingPlanHeader,
  UserTrainingPlanWrapper,
} from "./User.styled";
import type { AdminUser, Training, UserTrainingPlanProps } from "./User.types";
import { CATEGORIES_QUERY } from "../categories/Categories.queries";
import type { CategoriesQuery } from "../../../../__generated__/CategoriesQuery.graphql";
import type { ExerciseVariablesAllQuery } from "../../../../__generated__/ExerciseVariablesAllQuery.graphql";
import { GET_ALL_EXERCISE_VARIABLES } from "../exercise_variables/Exercise_Variables.queries";
import { Suspense, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Modal from "../../../shared/modal/Modal";
import TrainingModal from "./TrainingModal";
import { TRAININGS_QUERY } from "./UserTraining.queries";
import type { UserTrainingQuery } from "../../../../__generated__/UserTrainingQuery.graphql";
import PreviewFile from "../../../shared/preview_file/PreviewFiles";
import viewIcon from "../../../../icons/eye.svg";
import EditTrainingModal from "./EditTrainingModal";

const UserTrainingPlan = ({
  queryRef,
  setIsEditModalOpen,
}: UserTrainingPlanProps) => {
  const { trainings } = usePreloadedQuery<UserTrainingQuery>(
    TRAININGS_QUERY,
    queryRef
  );

  return !trainings.length ? (
    <UserNoTrainings>Sem treinos</UserNoTrainings>
  ) : (
    <UserTrainingPlanWrapper>
      {trainings.map((training) => (
        <UserTrain>
          <UserTrainHeader>
            <UserTrainHeaderTitle>{training.name}</UserTrainHeaderTitle>
            <ActionButton
              action="view"
              onClick={() => setIsEditModalOpen(training)}
            >
              <img src={viewIcon} />
            </ActionButton>
          </UserTrainHeader>
          <UserTrainingImage>
            <PreviewFile
              width={100}
              height={"auto"}
              file={training?.photo?.url || null}
            />
          </UserTrainingImage>
          <ol>
            {training.exercises.map((exercise) => (
              <li key={`${training.id}-${exercise.exercise.id}`}>
                {exercise.exercise.name}
              </li>
            ))}
          </ol>
        </UserTrain>
      ))}
    </UserTrainingPlanWrapper>
  );
};

const Loader = ({ user }: { user: AdminUser }) => {
  const [catsQueryRef, fetchCategories] =
    useQueryLoader<CategoriesQuery>(CATEGORIES_QUERY);
  const [exerciseVariablesRef, fetchExerciseCategories] =
    useQueryLoader<ExerciseVariablesAllQuery>(GET_ALL_EXERCISE_VARIABLES);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<Training | null>(null);
  const [queryRef, fetchData] =
    useQueryLoader<UserTrainingQuery>(TRAININGS_QUERY);

  useEffect(() => {
    fetchData({ target_id: user.id });
    fetchCategories({});
    fetchExerciseCategories({});
  }, []);

  const handleTrainingAction = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(null);
    fetchData({ target_id: user.id }, { fetchPolicy: "network-only" });
  };
  return (
    <>
      <UserTrainingPlanContainer>
        <UserTrainingPlanHeader>
          <div className="montserrat-bold">Plano de Treinos</div>
          <ActionButton action="edit" onClick={() => setIsModalOpen(true)}>
            <img src="/plus.svg" />
          </ActionButton>
        </UserTrainingPlanHeader>
        <UserTrainingPlanBody>
          <Suspense fallback="LOADING">
            {queryRef ? (
              <UserTrainingPlan
                queryRef={queryRef}
                setIsEditModalOpen={setIsEditModalOpen}
              />
            ) : null}
          </Suspense>
        </UserTrainingPlanBody>
      </UserTrainingPlanContainer>
      {isModalOpen && catsQueryRef && exerciseVariablesRef
        ? createPortal(
            <Modal
              title={`Novo treino para ${user.name}`}
              onDismiss={() => setIsModalOpen(false)}
            >
              <TrainingModal
                target_id={user.id}
                onSubmit={handleTrainingAction}
                catsQueryRef={catsQueryRef}
                exerciseVariablesRef={exerciseVariablesRef}
                onDismiss={() => setIsModalOpen(false)}
              />
            </Modal>,
            document.body
          )
        : isEditModalOpen
        ? createPortal(
            <Modal
              title={isEditModalOpen.name}
              onDismiss={() => setIsEditModalOpen(null)}
            >
              <EditTrainingModal
                training={isEditModalOpen}
                onSubmit={handleTrainingAction}
                onDismiss={() => setIsEditModalOpen(null)}
              />
            </Modal>,
            document.body
          )
        : null}
    </>
  );
};

export default Loader;
