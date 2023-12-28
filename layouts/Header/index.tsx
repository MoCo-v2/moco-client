import React, {useState, useEffect} from 'react';
import {signOut, useSession} from 'next-auth/react';
import Link from 'next/link';

import {deleteCookie, getCookie, setCookie} from 'cookies-next';
import {Container, Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';

import {LoginModal, SignUpModal} from '@/containers';

import {ROUTE_WRITE} from '@/routes';

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
    align-items: center;
    .write-btn {
      text-decoration: none;
      color: rgba(0, 0, 0, 0.65);
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out;
      &:hover {
        color: #000;
      }
    }
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
      if (!getCookie('moco_asct')) {
        setCookie('moco_asct', session.accessToken);
        setCookie('moco_rsct', session.refreshToken);
      }
    } else {
      setShowSignUpModal(true);
      deleteCookie('moco_asct');
      deleteCookie('moco_rsct');
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
              <Link className="write-btn" href={ROUTE_WRITE}>
                새 글 쓰기
              </Link>
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
