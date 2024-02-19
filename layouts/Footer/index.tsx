import React from 'react';

import styled from 'styled-components';

const StyledFooter = styled.footer`
  height: 20rem;
  padding: 3rem 6rem;
  background: #373c42;
  .top {
    color: #d5d0d0;
    font-size: 3.2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }
  .middle {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    color: #fffbfb;
    margin-bottom: 1.5rem;
    .contact {
      font-size: 1.4rem;
      font-weight: 400;
    }
    .policy {
      display: flex;
      gap: 2rem;
      font-size: 1.4rem;
      font-weight: 400;
      a {
        color: #fffbfb;
        text-decoration: none;
      }
    }
  }
  .bottom {
    color: #d5d0d0;
    font-size: 1.2rem;
    text-align: right;
  }
`;

export const Footer = () => {
  return (
    <StyledFooter>
      <div className="top">MOCO</div>
      <div className="middle">
        <div className="contact">
          Contact team.moco.offcial@gmail.com
          <br />
          Copyright moco. All rights reserved
        </div>
        <div className="policy">
          <a
            href="https://coordinated-fall-d87.notion.site/c7186148a8084a33ade992d000da5e45?pvs=4"
            target="_blank"
          >
            이용약관
          </a>
          <a
            href="https://coordinated-fall-d87.notion.site/b0849666083547158409ef141986d03a?pvs=4"
            target="_blank"
          >
            개인정보처리방침
          </a>
        </div>
      </div>
      <div className="bottom">© 2024 MOCO</div>
    </StyledFooter>
  );
};
