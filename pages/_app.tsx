import type {AppProps} from 'next/app';
import Head from 'next/head';

import {SessionProvider} from 'next-auth/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ThemeProvider} from 'styled-components';

import {PageLoader} from '@/components';

import {useLoadingStore} from '@/store/loading';

import {theme} from '@/styles/theme';

import {Noto_Sans_KR} from 'next/font/google';

const noto = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';

import '@/styles/globals.css';

const queryClient = new QueryClient();

export default function App({Component, pageProps}: AppProps) {
  const {loading} = useLoadingStore();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={pageProps.session}>
          <ThemeProvider theme={theme}>
            <main className={noto.className}>
              {loading && <PageLoader />}
              <Component {...pageProps} />
            </main>
          </ThemeProvider>
        </SessionProvider>
      </QueryClientProvider>
    </>
  );
}
