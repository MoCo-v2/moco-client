import {GetServerSideProps} from 'next';
import Head from 'next/head';

import {AppLayout} from '@/layouts/AppLayout';

import {PostDetail} from '@/containers';

import {postAPI, ResponsePost} from '@/modules';

import {WRITE_TYPE} from '@/consts';

export default function Post({post}: {post: ResponsePost}) {
  return (
    <>
      <Head>
        <title>{post.title} | MOCO</title>
        <meta name="description" content={post.title} />
        <meta
          name="keywords"
          content={
            WRITE_TYPE.find(x => x.value === post.type)?.label || '프로젝트'
          }
        />
        <meta property="og:title" content={post.title} />
      </Head>
      <AppLayout>
        <PostDetail post={post} />
      </AppLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const {id} = context.query;

  const post = await postAPI.getPostById(id as string);

  return {
    props: {
      post,
    },
  };
};
