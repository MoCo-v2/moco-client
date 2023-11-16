import React from 'react';

import {Container, Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';

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
  }

  .point-color {
    color: ${({theme}) => theme.color.blue};
  }
`;

export const Header = () => {
  return (
    <StyledNavBar expand="lg">
      <Container>
        <Navbar.Brand href="/">
          M<span className="point-color">O</span>C
          <span className="point-color">O</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link href="#home">새 글 쓰기</Nav.Link>
            <Nav.Link href="#link">로그인</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavBar>
  );
};
