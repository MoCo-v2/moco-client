import React, {useState, useEffect} from 'react';
import {signOut, useSession} from 'next-auth/react';
import Link from 'next/link';

import {deleteCookie, getCookie, setCookie} from 'cookies-next';
import {Container, Nav, NavDropdown, Navbar} from 'react-bootstrap';
import styled from 'styled-components';

import {LoginModal, SignUpModal} from '@/containers';

import {
  ROUTE_BOOKMARK,
  ROUTE_MYPOST,
  ROUTE_PROFILE,
  ROUTE_WRITE,
} from '@/routes';

import {useUser} from '@/hooks/useUser';

const StyledNavBar = styled(Navbar)`
  height: 8.5rem;
  font-size: 1.8rem;
  font-weight: 900;

  @media screen and (max-width: 1080px) {
    padding: 0 3rem;
  }

  .navbar-brand {
    font-size: 2.4rem;
    font-weight: 900;
  }

  .navbar-nav {
    gap: 3rem;
    flex-direction: row;
    align-items: center;
    .nav-btn {
      text-decoration: none;
      color: rgba(0, 0, 0, 0.65);
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out;
      &:hover {
        color: #000;
      }
    }
    .dropdown-menu {
      position: absolute;
      @media screen and (max-width: 1080px) {
        position: absolute;
        right: 0;
        left: unset;
      }
    }
  }

  .point-color {
    color: ${({theme}) => theme.color.blue};
  }

  .profile-img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #f5f5f5;
  }

  .dropdown-item {
    font-size: 1.6rem;
    font-weight: 700;
    padding: 0.5rem 1.5rem;
    &:active {
      background-color: #f8f9fa;
    }
  }
`;

export const Header = () => {
  const {data: session, status} = useSession();
  const {user} = useUser();

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
    deleteCookie('moco_rsct');
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
              <Link className="nav-btn" href={ROUTE_WRITE}>
                모집하기
              </Link>
              <NavDropdown
                title={
                  <img
                    className="profile-img"
                    src={user?.picture || ''}
                    alt="porfile"
                  />
                }
                id="nav-dropdown"
              >
                <NavDropdown.Item>
                  <Link className="nav-btn" href={ROUTE_PROFILE}>
                    내 정보
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link className="nav-btn" href={ROUTE_MYPOST}>
                    내 작성글
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link className="nav-btn" href={ROUTE_BOOKMARK}>
                    내 관심글
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logOut}>
                  <a className="nav-btn">로그아웃</a>
                </NavDropdown.Item>
              </NavDropdown>
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
