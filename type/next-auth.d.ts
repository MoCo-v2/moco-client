import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    id?: string;
    isLogin: boolean;
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    isLogin: boolean;
    accessToken: string;
  }
}
