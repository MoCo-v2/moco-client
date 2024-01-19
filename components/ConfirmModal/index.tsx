import {ReactNode} from 'react';

import {
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  Button,
} from 'react-bootstrap';

import {StyledModal} from './style';

interface Props {
  show: boolean;
  onHide: () => void;
  onOk: () => void;
  modalTitle?: ReactNode;
  children?: ReactNode;
}

export const ConfirmModal = (props: Props) => {
  const {show, onHide, onOk, modalTitle, children} = props;
  return (
    <StyledModal show={show} onHide={onHide} size="sm" centered>
      {modalTitle && (
        <ModalHeader closeButton>
          <ModalTitle>{modalTitle}</ModalTitle>
        </ModalHeader>
      )}
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={onHide}>
          취소
        </Button>
        <Button variant="primary" onClick={onOk}>
          확인
        </Button>
      </ModalFooter>
    </StyledModal>
  );
};
