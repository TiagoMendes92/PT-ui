import {
  DismissButton,
  ModalActions,
} from "../../../shared/modal/Modal.styles";
import { Button } from "../../../shared/styles/Table.styled";
import { ExerciseSetsTableList } from "./EditTrainingModal.styled";
import ExerciseSetsTable from "./ExerciseSetsTable";
import type {
  EditTrainingFormData,
  EditTrainingModalProps,
} from "./User.types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "react-relay";
import { TRAINING_EDIT } from "./UserTraining.queries";
import type {
  UserTrainingUpdateMutation,
  UserTrainingUpdateMutation$data,
} from "../../../../__generated__/UserTrainingUpdateMutation.graphql";
import Loader from "../../../shared/loader/Loader";

const EditTrainingSchema = yup.object().shape({
  exercises: yup
    .array()
    .of(
      yup.object().shape({
        exerciseId: yup.string().required(),
        sets: yup
          .array()
          .of(
            yup.object().shape({
              setNumber: yup.number().required(),
              variables: yup
                .array()
                .of(
                  yup.object().shape({
                    id: yup.string().required(),
                    variableId: yup.string().required(),
                    targetValue: yup
                      .string()
                      .required("O valor da variável é obrigatório")
                      .test(
                        "positive-number",
                        "O valor tem que ser um número maior que 0",
                        (value) => {
                          if (!value || value.trim() === "") return false;
                          const num = Number(value);
                          return !isNaN(num) && num > 0;
                        }
                      ),
                  })
                )
                .required(),
            })
          )
          .required(),
      })
    )
    .required(),
});

const EditTrainingModal = ({
  training,
  onDismiss,
  onSubmit,
}: EditTrainingModalProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const [edit, isLoading] =
    useMutation<UserTrainingUpdateMutation>(TRAINING_EDIT);

  const defaultValues: EditTrainingFormData = {
    exercises: training.exercises.map((e) => ({
      exerciseId: e.exercise.id,
      sets: e.sets.map((set) => ({
        setNumber: set.setNumber,
        variables: set.variables.map((v) => ({
          id: v.id ?? "",
          variableId: v.variable.id,
          targetValue: v.targetValue ?? "",
        })),
      })),
    })),
  };

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EditTrainingFormData>({
    resolver: yupResolver(EditTrainingSchema),
    defaultValues,
  });

  const setManualError = (message?: string) => {
    setError("root", {
      type: "manual",
      message: message || `Erro ao editar treino`,
    });
  };

  const onSubmitForm = (data: EditTrainingFormData) => {
    edit({
      variables: {
        input: {
          training_id: training.id,
          exercises: data.exercises.map((e, i) => ({
            ...e,
            orderPosition: i + 1,
            name: undefined,
          })),
        },
      },
      onCompleted: (response: UserTrainingUpdateMutation$data, errors) => {
        if (response.editTraining?.id) {
          onSubmit();
          return;
        }
        setManualError(errors?.[0].message);
      },
      onError: () => {
        setManualError();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <ExerciseSetsTableList>
        {training.exercises.map((e, i) => (
          <ExerciseSetsTable
            key={e.exercise.id}
            exercise={e}
            exerciseIndex={i}
            control={control}
            isEditing={isEditing}
            errors={errors}
          />
        ))}
      </ExerciseSetsTableList>
      <ModalActions>
        {!isEditing ? (
          <>
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(true);
              }}
              className="montserrat-bold"
            >
              EDITAR
            </Button>
            <DismissButton
              type="button"
              onClick={onDismiss}
              className="montserrat-bold"
            >
              FECHAR
            </DismissButton>
          </>
        ) : (
          <>
            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="montserrat-bold"
            >
              {isSubmitting || isLoading ? (
                <Loader size={15} color="white" />
              ) : (
                "EDITAR TREINO"
              )}
            </Button>
            <DismissButton
              type="button"
              onClick={() => {
                reset();
                setIsEditing(false);
              }}
              className="montserrat-bold"
            >
              CANCELAR
            </DismissButton>
          </>
        )}
      </ModalActions>
    </form>
  );
};

export default EditTrainingModal;
