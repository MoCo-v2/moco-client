import React, {useState, useEffect} from 'react';
import {signOut, useSession} from 'next-auth/react';

import {deleteCookie, setCookie} from 'cookies-next';
import {Container, Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';

import {LoginModal, SignUpModal} from '@/containers';

const StyledNavBar = styled(Navbar)`
  height: 8.5rem;
  font-size: 1.8rem;
  font-weight: 900;

  .navbar-brand {
    font-size: 2.4rem;
    font-weight: 900;
  }

  .navbar-nav {
    gap: 3rem;
    flex-direction: row;
  }

  .point-color {
    color: ${({theme}) => theme.color.blue};
  }
`;

export const Header = () => {
  const {data: session, status} = useSession();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  useEffect(() => {
    if (!session) return;
    if (session.isLogin) {
      setShowSignUpModal(false);
      setCookie('moco_asct', session.accessToken);
    } else {
      setShowSignUpModal(true);
      deleteCookie('moco_asct');
    }
  }, [session]);

  const onCloseSignUpModal = async () => {
    setShowSignUpModal(false);
    await signOut();
  };

  const logOut = async () => {
    deleteCookie('moco_asct');
    await signOut();
  };

  return (
    <StyledNavBar expand="lg">
      <Container>
        <Navbar.Brand href="/">
          M<span className="point-color">O</span>C
          <span className="point-color">O</span>
        </Navbar.Brand>
        <Nav>
          {session?.isLogin ? (
            <>
              <Nav.Link href="#home">새 글 쓰기</Nav.Link>
              <Nav.Link onClick={logOut}>로그아웃</Nav.Link>
            </>
          ) : (
            <Nav.Link onClick={() => setShowLoginModal(true)}>로그인</Nav.Link>
          )}
        </Nav>
      </Container>
      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
      />
      <SignUpModal show={showSignUpModal} onHide={onCloseSignUpModal} />
    </StyledNavBar>
  );
};
