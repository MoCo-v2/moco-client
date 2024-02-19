import Head from 'next/head';

import {AppLayout} from '@/layouts/AppLayout';

import {MainBanner, PostList} from '@/containers';

export default function Home() {
  return (
    <>
      <Head>
        <title>MOCO</title>
        <meta
          name="description"
          content="사이드 프로젝트, 멘토링, 스터디 팀빌딩 서비스"
        />
        <meta
          name="keywords"
          content="스터디, 사이드 프로젝트, 과외, 모각코, 모코, moco"
        />
        <meta property="og:title" content="MOCO" />
        <meta
          property="og:description"
          content="사이드 프로젝트, 멘토링, 스터디 팀빌딩 서비스"
        />
      </Head>
      <AppLayout>
        <MainBanner />
        <PostList />
      </AppLayout>
    </>
  );
}
