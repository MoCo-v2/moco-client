import Link from 'next/link';

import {Button} from 'react-bootstrap';

import {Modal} from '@/components';

import {ROUTE_SIGNUP} from '@/routes';

import {StyledModalBody, StyledModalTitle} from './style';

interface Props {
  show: boolean;
  onHide: () => void;
}

export const SignUpModal = (props: Props) => {
  const {show, onHide} = props;

  return (
    <Modal
      show={show}
      onHide={onHide}
      modalTitle={
        <StyledModalTitle>
          M<span className="point-color">O</span>C
          <span className="point-color">O</span>
        </StyledModalTitle>
      }
    >
      <StyledModalBody>
        <div className="title">
          MOCO에 처음 오셨군요!
          <br />
          회원가입 후 팀원을 모집하시겠어요?
        </div>
        <div className="btn-wrapper">
          <Button variant="secondary" onClick={onHide}>
            다음에 하기
          </Button>
          <Link href={ROUTE_SIGNUP}>
            <Button>가입하기</Button>
          </Link>
        </div>
      </StyledModalBody>
    </Modal>
  );
};
