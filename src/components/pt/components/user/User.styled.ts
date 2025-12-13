import styled from "styled-components";
import { ActionButton } from "../../../shared/styles/Table.styled";
import { Grid } from "../templates/Templates.styled";

export const UserPage = styled("div")`
  height: 100%;
  display: flex;
  padding: 40px 20px;
  flex-direction: column;

  @media (min-width: 768px) {
    overflow: auto;
    padding: 40px;
  }
`;

export const UserPageHeader = styled("div")``;

export const BackButton = styled(ActionButton)`
  img {
    transform: rotate(90deg);
  }
`;

export const UserNotFound = styled("div")``;

export const UserDetailsContainer = styled("div")`
  padding: 20px;
  margin-top: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

export const UserDetailsContainerGrid = styled("div")`
  gap: 20px;
  display: flex;
  .preview-container {
    height: 100%;
    img {
      overflow: hidden;
      object-fit: cover;
      border-radius: 50%;
    }
  }
`;

export const UserDetailsKeyValue = styled("div")`
  flex: 1;
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  flex-direction: row;

  > div {
    min-width: 350px;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
    width: calc(50% - 5px);
    text-overflow: ellipsis;
  }
`;

export const UserVarNotDefined = styled("span")`
  font-style: italic;
  color: grey;
`;

export const UserTrainingPlanContainer = styled("div")`
  padding: 20px;
  margin-top: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

export const UserTrainingPlanHeader = styled("div")`
  display: flex;
  justify-content: space-between;

  > div:first-of-type {
    font-size: 24px;
  }
`;

export const UserTrainingPlanBody = styled("div")``;

export const UserNoTrainings = styled("div")`
  height: 80px;
  display: flex;
  margin-top: 30px;
  align-items: center;
  background: #f5f6f9;
  justify-content: center;
  border-radius: 8px;
`;

export const UserTrainingPlanWrapper = styled(Grid)`
  margin-top: 30px;
`;

export const UserTrain = styled("div")`
  padding: 15px;
  background: white;
  border-radius: 8px;
  border: 1px solid lightgrey;
`;

export const UserTrainHeader = styled("div")`
  gap: 10px;
  display: flex;
  padding-bottom: 10px;
  justify-content: space-between;
  border-bottom: 1px solid white;
`;

export const UserTrainHeaderTitle = styled("div")`
  flex: 1;
  font-weight: 600;
`;

export const UserTrainingImage = styled("div")`
  display: flex;
  justify-content: center;
`;
