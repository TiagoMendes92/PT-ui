import styled, { css } from "styled-components";
import { Chip } from "../../pt/components/exercises/Exercises.styled";

export const ExercisesList = styled.div`
  overflow: auto;
  max-height: 260px;
  border-radius: 16px;
  border: 1px solid lightgrey;
  margin-bottom: 20px;
  padding: 8px;
`;

export const Exercise = styled("div").withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>`
  display: flex;
  padding: 8px;
  &:not(:last-of-type) {
    border-bottom: 1px solid lightgrey;
  }

  > div:first-of-type {
    flex: 1;
  }

  ${({ active }) =>
    active &&
    css`
      background: #c4cbf2;
    `};
`;

export const SelectedExercises = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

export const ChipWithAction = styled(Chip)`
  gap: 5px;
  display: flex;
  align-items: center;
  border: 1px solid lightgrey;

  button {
    width: 20px;
    cursor: pointer;
  }
`;
