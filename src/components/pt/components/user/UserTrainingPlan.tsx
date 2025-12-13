import { usePreloadedQuery, useQueryLoader } from "react-relay";
import { ActionButton } from "../../../shared/styles/Table.styled";
import {
  UserNoTrainings,
  UserTrainingPlanBody,
  UserTrainingPlanContainer,
  UserTrainingPlanHeader,
} from "./User.styled";
import type { AdminUser, UserTrainingPlanProps } from "./User.types";
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

const UserTrainingPlan = ({ user, queryRef }: UserTrainingPlanProps) => {
  const { trainings } = usePreloadedQuery<UserTrainingQuery>(
    TRAININGS_QUERY,
    queryRef
  );

  return !trainings.length ? (
    <UserNoTrainings>Sem treinos para o aluno "{user.name}"</UserNoTrainings>
  ) : (
    <>asd</>
  );
};

const Loader = ({ user }: { user: AdminUser }) => {
  const [catsQueryRef, fetchCategories] =
    useQueryLoader<CategoriesQuery>(CATEGORIES_QUERY);
  const [exerciseVariablesRef, fetchExerciseCategories] =
    useQueryLoader<ExerciseVariablesAllQuery>(GET_ALL_EXERCISE_VARIABLES);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [queryRef, fetchData] =
    useQueryLoader<UserTrainingQuery>(TRAININGS_QUERY);

  useEffect(() => {
    fetchData({ target_id: user.id });
    fetchCategories({});
    fetchExerciseCategories({});
  }, []);
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
          <Suspense fallback="LADOIGN">
            {queryRef ? (
              <UserTrainingPlan user={user} queryRef={queryRef} />
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
                onSubmit={() => setIsModalOpen(false)}
                catsQueryRef={catsQueryRef}
                exerciseVariablesRef={exerciseVariablesRef}
                onDismiss={() => setIsModalOpen(false)}
              />
            </Modal>,
            document.body
          )
        : null}
    </>
  );
};

export default Loader;
