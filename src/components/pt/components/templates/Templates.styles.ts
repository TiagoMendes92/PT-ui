import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;

  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const GridCard = styled("div")`
  padding: 10px;
  border: 1px solid white;
`;

export const GridCardHeader = styled.div`
  gap: 10px;
  display: flex;
  padding-bottom: 10px;
  justify-content: space-between;
  border-bottom: 1px solid white;
`;

export const GridCardTitle = styled.div`
  flex: 1;
`;

export const GridCardActions = styled.div`
  display: flex;
  gap: 10px;
`;

export const TextArea = styled("textarea").withConfig({
  shouldForwardProp: (prop) => prop !== "hasError",
})<{ hasError: boolean }>`
  outline: 0;
  resize: none;
  font-size: 14px;
  margin-top: 10px;
  border-radius: 16px;
  padding-block: 10px;
  padding-inline: 15px;
  width: calc(100% - 32px);
  transition: border-color 0.3s ease;
  border: 1px solid ${({ hasError }) => (hasError ? "red" : "lightgrey")};
`;

export const ExercisesList = styled.div`
  color: white;
  overflow: auto;
  max-height: 260 px;
  border: 1px solid white;
`;
