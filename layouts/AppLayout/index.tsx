import React, {ReactNode} from 'react';

import {Header} from '../Header';
import {Footer} from '../Footer';
import styled from 'styled-components';

const Layout = styled.div`
  @media screen and (max-width: 1080px) {
    position: relative;
    width: 100%;
    height: 100vh;
    z-index: 10;

    /* ::after {
      content: '';
      z-index: 1001;
      position: fixed;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      min-width: 370px;
      width: 100%;
      height: 100vh;
      background-image: url('/images/main/mobile_main.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      background-color: #fff;
    }
    > div {
      display: none;
    } */
  }
`;

interface Props {
  children?: ReactNode;
}

export const AppLayout = (props: Props) => {
  const {children} = props;

  return (
    <Layout>
      <Header />
      {children}
      <Footer />
    </Layout>
  );
};
