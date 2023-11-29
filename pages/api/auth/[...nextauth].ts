import axios from 'axios';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import KakaoProvider from 'next-auth/providers/kakao';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({token, account}) {
      if (account) {
        // 이미 가입된 유저인지 신규 유저인지 API 요청
        // const data = await axios
        //   .post(`${process.env.NEXT_PUBLIC_MOCO_API_URL}/api/v1/login`, {
        //     provider: account.provider,
        //     accessToken: account.access_token,
        //   })
        //   .then(res => res.data);
        // 유저정보 토큰에 넣기
        // token.userInfo = data;
      }
      return token;
    },
    async session({session, token, user}) {
      if (session) {
        console.log('token###', token);
        // TODO:: 세션에 넘겨줄 값 정의...
        // session.user = token.userInfo;
        // TODO:: 또는 쿠키에 받은 토큰 저장.. or 세션으로 토큰 넘긴 다음에 화면에서 받아서 쿠키에 저장
      }
      return session;
    },
  },
});
