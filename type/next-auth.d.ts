import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    isLogin: boolean;
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    isLogin: boolean;
    accessToken: string;
  }
}
