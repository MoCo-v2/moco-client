import Head from 'next/head';

import {Button} from 'react-bootstrap';

import {AppLayout} from '@/layouts/AppLayout';

export default function Home() {
  return (
    <>
      <Head>
        <title>MOCO</title>
        <meta name="description" content="MOCO" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>안녕하세요</AppLayout>
    </>
  );
}
