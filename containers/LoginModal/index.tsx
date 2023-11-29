import {useSession, signIn} from 'next-auth/react';

import {Modal} from '@/components';

import {StyledModalBody, StyledModalTitle} from './style';

// images
import GoogleLogo from 'public/images/logo/google-logo.svg';
import GithubLogo from 'public/images/logo/github-logo.svg';
import KakaoLogo from 'public/images/logo/kakao-logo.svg';

interface Props {
  show: boolean;
  onHide: () => void;
}

export const LoginModal = (props: Props) => {
  const {show, onHide} = props;

  const {data: session, status} = useSession();

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
        <div className="title">MOCO에 오신 것을 환영합니다!</div>
        <div className="content">
          <div className="item" onClick={() => signIn('google')}>
            <button className="item-img google">
              <GoogleLogo />
            </button>
            <div className="desc">Google 로그인</div>
          </div>
          <div className="item" onClick={() => signIn('github')}>
            <button className="item-img github">
              <GithubLogo />
            </button>
            <div className="desc">Github 로그인</div>
          </div>
          <div className="item" onClick={() => signIn('kakao')}>
            <button className="item-img kakao">
              <KakaoLogo />
            </button>
            <div className="desc">Kakao 로그인</div>
          </div>
        </div>
      </StyledModalBody>
    </Modal>
  );
};
