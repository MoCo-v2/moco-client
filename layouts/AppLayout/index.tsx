import React, {ReactNode} from 'react';

import {Header} from '../Header';

interface Props {
  children?: ReactNode;
}

export const AppLayout = (props: Props) => {
  const {children} = props;

  return (
    <>
      <Header />
      {children}
    </>
  );
};
