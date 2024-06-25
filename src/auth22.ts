import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import dbConnect from "./lib/dbConnect"
import UserModel from "./model/user.model"
import { createErrorResponse } from "./app/utils/ApiResponse"
import bcrypt from 'bcryptjs'
import mongoose from "mongoose"
 
export const { handlers: {GET, POST}, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_WEBAPP_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.AUTH_WEBAPP_GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        console.log("User credentials auth.ts 21 line:- ", credentials);

        try {
          const user = await UserModel.findOne({email: credentials.identifier});

          if(!user){
            return createErrorResponse("User not found with this email", 400);
          }

          if(!user.isVerified){
            return createErrorResponse("User not found with this email", 401);
          }

          // Compare Password

          const comparePassword = await bcrypt.compare(credentials.password, user.password)

          if(comparePassword){
            return user
          }else{
            return createErrorResponse("Password Incorrect", 400)
          }

        } catch (error) {
          console.log("Error in authorize", error);
          return error
        }
      }
    })
  ],
  callbacks: {
    async signIn({user, account, profile}){
      await dbConnect()
      console.log("Google User", user);
      console.log("Google Account", account);
      console.log("Google Profile", profile);

      try {
        let existingUser = await UserModel.findOne({email: user.email});

        if(!existingUser){
          existingUser = new UserModel({
            username: profile?.name || user.name,
            email: user.email,
            isVerified: true
          })

          await existingUser.save()
        }

        user._id = (existingUser._id as mongoose.Types.ObjectId).toString();
        user.isVerified = existingUser.isVerified;
        user.username = existingUser.username

        return true

      } catch (error) {
        console.error("Error during sign in:", error);
        return false;
      }

      },
      async jwt({ token, user }) {
        if (user) {
            token._id = (user._id as unknown as string) || "";
            token.isVerified = user.isVerified;
            token.username = user.username;
        }
        return token;
    },
    async session({ session, token }) {
        if (token) {
            session.user._id = token._id as string;
            session.user.isVerified = token.isVerified;
            session.user.username = token.username;
        }
        return session;
    },

  },
  pages: {
    signIn: "/signin"
  },
  session: {
      strategy: "jwt"
  },
  secret: process.env.AUTH_SECRET

})