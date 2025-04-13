import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "c24f803bcfad9112c38a",
      clientSecret: "11fb52833ebeab4565664133a8c7b029536b2af5",
    }),

    GoogleProvider({
      clientId:
        "39107283549-6k4jio04ljg2pdm84m2ggm2dhpmak8gi.apps.googleusercontent.com",
      clientSecret: "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",
    }),

    CredentialsProvider({
      // credentials provider 설정
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        let db = (await connectDB).db("ghostwriter");
        let user = await db
          .collection("member")
          .findOne({ email: credentials.email });
        if (!user) {
          console.log("해당 이메일은 없음");
          return null;
        }
        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!pwcheck) {
          console.log("비번틀림");
          return null;
        }
        return user;
      },
    }),
  ],

  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30일
  },

  callbacks: {
    //4. jwt 만들 때 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
        token.user.role = user.role;
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    logIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
