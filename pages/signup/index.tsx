import {useSession} from 'next-auth/react';

const SignUpPage = () => {
  const {data: session, status} = useSession();

  return <div>회원가입페이지{session?.user?.email}</div>;
};

export default SignUpPage;
