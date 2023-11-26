import React, {useState} from 'react';

import {Container, Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';

import {LoginModal} from '@/containers';

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
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <StyledNavBar expand="lg">
      <Container>
        <Navbar.Brand href="/">
          M<span className="point-color">O</span>C
          <span className="point-color">O</span>
        </Navbar.Brand>
        <Nav>
          <Nav.Link href="#home">새 글 쓰기</Nav.Link>
          <Nav.Link onClick={() => setShowLoginModal(true)}>로그인</Nav.Link>
        </Nav>
      </Container>
      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
      />
    </StyledNavBar>
  );
};
