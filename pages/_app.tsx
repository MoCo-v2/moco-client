import type {AppProps} from 'next/app';
import Head from 'next/head';

import {ThemeProvider} from 'styled-components';

import '@/styles/globals.css';
import {theme} from '@/styles/theme';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>MOCO</title>
        <meta name="description" content="MOCO" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
