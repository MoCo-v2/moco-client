import {AppLayout} from '@/layouts/AppLayout';

import {MainBanner, PostList} from '@/containers';

export default function Home() {
  return (
    <AppLayout>
      <MainBanner />
      <PostList />
    </AppLayout>
  );
}
