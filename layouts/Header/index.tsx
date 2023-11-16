import Link from 'next/link';
import React from 'react';

import {Container, Nav, Navbar} from 'react-bootstrap';

export const Header = () => {
  return (
    <Navbar
      expand="lg"
      style={{
        height: '8.5rem',
      }}
    >
      <Container>
        <Navbar.Brand href="/">MOCO</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link href="#home">새 글 쓰기</Nav.Link>
            <Nav.Link href="#link">로그인</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
