import React, {ReactNode} from 'react';

import {Header} from '../Header';
import {Footer} from '../Footer';

interface Props {
  children?: ReactNode;
}

export const AppLayout = (props: Props) => {
  const {children} = props;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
