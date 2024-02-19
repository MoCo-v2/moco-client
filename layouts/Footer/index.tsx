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
      div {
        cursor: pointer;
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
          <div>이용약관</div>
          <div>개인정보처리방침</div>
        </div>
      </div>
      <div className="bottom">© 2024 MOCO</div>
    </StyledFooter>
  );
};
