import styled, { css } from "styled-components";
import { Chip } from "../../pt/components/exercises/Exercises.styled";

export const Exercise = styled("div").withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>`
  display: flex;
  padding: 8px;

  > div:first-of-type {
    flex: 1;
  }

  ${({ active }) =>
    active &&
    css`
      background: white;
      color: black;

      button {
        border: 1px solid black;
      }
    `};
`;

export const SelectedExercises = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

export const ChipWithAction = styled(Chip)`
  display: flex;
  gap: 5px;
  align-items: center;
  button {
    width: 20px;
    cursor: pointer;
  }
`;
