import {useEffect, useMemo} from 'react';
import {useRouter} from 'next/router';

import {useSession} from 'next-auth/react';

import {SignUpForm} from '@/containers';

const SignUpPage = () => {
  const {data: session, status} = useSession();

  const router = useRouter();

  const data = useMemo(() => {
    if (!session?.id) return;
    return {
      id: session.id,
      name: session.user?.name || '',
      picture: session.user?.image || '',
    };
  }, [session]);

  useEffect(() => {
    if (!data) router.push('/');
  }, [data]);

  return (
    <>
      {data ? (
        <SignUpForm id={data.id} name={data.name} picture={data.picture} />
      ) : (
        <></>
      )}
    </>
  );
};

export default SignUpPage;
