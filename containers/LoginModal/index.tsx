import axios from 'axios';

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

  const test = async () => {
    try {
      console.log('test###');
      const test = await axios
        .get('http://192.168.219.144:8080/oauth2/authorization/google')
        .then(response => {
          console.log('aaaa###');
          return response;
        })
        .catch(error => {});
    } catch (error) {
      console.log('err###', error);
    }
  };

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
          <div className="item" onClick={test}>
            <button className="item-img google">
              <GoogleLogo />
            </button>
            <div className="desc">Google 로그인</div>
          </div>
          <div className="item">
            <button className="item-img github">
              <GithubLogo />
            </button>
            <div className="desc">Github 로그인</div>
          </div>
          <div className="item">
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
