import styled from "styled-components";
import { Button } from "../styles/Table.styled";

export const Overlay = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  z-index: 1000;
  position: fixed;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const ModalContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 24px;
  overflow: hidden;
  max-height: 90vh;
  max-width: 500px;
  background: white;
  border-radius: 8px;
  margin-inline: 20px;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SubTitle = styled("h2")`
  margin: 0;
  font-size: 24px;
`;

export const ModalBody = styled.div`
  flex: 1;
  color: black;
  overflow-y: auto;
`;

export const Description = styled.div`
  font-size: 14px;
  color: #757575;
  margin-top: 10px;
  line-height: 1.5;
`;

export const ModalActions = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: space-between;

  > button {
    max-width: calc(50% - 5px);
  }
`;

export const DismissButton = styled(Button)`
  color: #f55367;
  background: white;
  border-color: #f55367;

  &:hover:not(:disabled) {
    color: white;
    background: #f55367;
  }
`;
