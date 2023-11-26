import {ReactNode} from 'react';

import {ModalHeader, ModalTitle, ModalBody, ModalFooter} from 'react-bootstrap';

import {StyledModal} from './style';

interface Props {
  show: boolean;
  onHide: () => void;
  modalTitle?: ReactNode;
  children?: ReactNode;
  modalFooter?: ReactNode;
}

export const Modal = (props: Props) => {
  const {show, onHide, modalTitle, children, modalFooter} = props;
  return (
    <StyledModal show={show} onHide={onHide} size="lg" centered>
      {modalTitle && (
        <ModalHeader closeButton>
          <ModalTitle>{modalTitle}</ModalTitle>
        </ModalHeader>
      )}
      <ModalBody>{children}</ModalBody>
      {modalFooter && <ModalFooter>{modalFooter}</ModalFooter>}
    </StyledModal>
  );
};
