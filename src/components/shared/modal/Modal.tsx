import {
  CloseButton,
  ModalBody,
  ModalContainer,
  ModalHeader,
  Overlay,
  SubTitle,
} from "./Modal.styles";
import type { ModalProps } from "./type";

const Modal = ({ title, children, onDismiss }: ModalProps) => {
  "use memo";
  return (
    <Overlay onClick={onDismiss}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <SubTitle className="montserrat-bold">{title}</SubTitle>
          <CloseButton onClick={onDismiss}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
