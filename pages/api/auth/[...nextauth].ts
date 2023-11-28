import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({user, account}) {
      try {
        // TODO:: 서버쪽으로 검증 API 요청 후 결과에 따라 분기처리
        // const { meta, data: token } = await snsLogin({ account, user });
        // return meta.code === 0 || `signin?errorcode=${meta.code}`
        return true;
      } catch (error) {
        // return `signin?errorcode=${error.message}`
        console.log(error);
        return true;
      }
    },
    async jwt({token, account, profile}) {
      if (account) {
        // TODO:: session 에 넘기고싶은 값 추가로 넘기기
        // token.accessToken = account.access_token;
        // token.id = profile.id;
      }
      return token;
    },
    async session({session, token, user}) {
      // session에 담고 싶은 값 정의
      // session.accessToken = token.accessToken;
      // session.user.id = token.id;
      return session;
    },
  },
});
