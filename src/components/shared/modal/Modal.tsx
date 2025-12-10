import {
  Description,
  ModalBody,
  ModalContainer,
  ModalHeader,
  Overlay,
  SubTitle,
} from "./Modal.styles";
import type { ModalProps } from "./type";

const Modal = ({
  title,
  subtitle,
  children,
  onDismiss,
  style = {},
}: ModalProps) => (
  <Overlay onClick={onDismiss}>
    <ModalContainer onClick={(e) => e.stopPropagation()} style={style}>
      <ModalHeader>
        <SubTitle className="montserrat-bold">{title}</SubTitle>
      </ModalHeader>
      <ModalBody>
        {subtitle && (
          <Description className="montserrat">{subtitle}</Description>
        )}
        {children}
      </ModalBody>
    </ModalContainer>
  </Overlay>
);

export default Modal;
