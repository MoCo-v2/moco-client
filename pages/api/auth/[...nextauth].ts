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
        const data = await axios
          .post(`${process.env.NEXT_PUBLIC_MOCO_API_URL}/api/v1/public/login`, {
            provider: account.provider,
            accessToken: account.access_token,
          })
          .then(res => res.data);

        if (data?.accessToken) {
          token.isLogin = true;
          token.accessToken = data.accessToken;
          token.refreshToken = data.refreshToken;
        } else {
          token.id = data.id;
          token.isLogin = false;
        }
      }
      return token;
    },
    async session({session, token, user}) {
      if (session) {
        if (token.accessToken) {
          session.accessToken = token.accessToken;
          session.refreshToken = token.refreshToken;
        } else {
          session.id = token.id;
        }
        session.isLogin = token.isLogin;
      }
      return session;
    },
    async redirect({url, baseUrl}) {
      return baseUrl;
    },
  },
});
