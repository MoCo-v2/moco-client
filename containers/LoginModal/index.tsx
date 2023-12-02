import {useEffect} from 'react';
import {useSession, signIn} from 'next-auth/react';

import {deleteCookie, setCookie} from 'cookies-next';

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

  useEffect(() => {
    // TODO:: 쿠키 또는 isLogin 값에 따른 회원가입 페이지 처리
    if (session) {
      const {accessToken, isLogin} = session;
      if (accessToken && isLogin) {
        setCookie('moco_asct', accessToken);
      } else {
        deleteCookie('moco_asct');
      }
    } else {
      deleteCookie('moco_asct');
    }
  }, [session]);

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
