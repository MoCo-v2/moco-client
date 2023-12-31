import {GetServerSideProps} from 'next';

import {AppLayout} from '@/layouts/AppLayout';

import {PostDetail} from '@/containers';

import {postAPI, ResponsePost} from '@/modules';

export default function Post({post}: {post: ResponsePost}) {
  return (
    <AppLayout>
      <PostDetail post={post} />
    </AppLayout>
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
