import {useSession} from 'next-auth/react';

import {SignUpForm} from '@/containers';
import {useMemo} from 'react';

const SignUpPage = () => {
  const {data: session, status} = useSession();

  const data = useMemo(() => {
    if (!session?.id) return;
    return {
      id: session.id,
      name: session.user?.name || '',
      picture: session.user?.image || '',
    };
  }, [session]);

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
