import {useRouter} from 'next/router';

import {WriteForm} from '@/containers';
import {AppLayout} from '@/layouts/AppLayout';

export default function Write() {
  const router = useRouter();
  const {id} = router.query;

  return (
    <AppLayout>
      <WriteForm id={id as string} />
    </AppLayout>
  );
}
