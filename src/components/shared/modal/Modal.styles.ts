import styled from "styled-components";
import { Button } from "../../login/LoginPage.styles";

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
  background-color: rgba(255, 255, 255, 0.5);
`;

export const ModalContainer = styled.div`
  width: 90%;
  display: flex;
  padding: 24px;
  max-height: 90vh;
  max-width: 500px;
  background: black;
  flex-direction: column;
  border: 2px solid white;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SubTitle = styled("h2")`
  font-size: 30px;
`;

export const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  color: black;
`;

export const CloseButton = styled(Button)`
  width: 40px;
  font-size: 40px;
`;
