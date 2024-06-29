import dbConnect from '@/lib/dbConnect'
import UserModel from '@/model/user.model'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_WEBAPP_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.AUTH_WEBAPP_GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: any): Promise<any> {
        console.log(credentials)
        await dbConnect()
        try {
          const user = await UserModel.findOne({
            email: credentials.identifier
          })

          if (!user) {
            throw new Error('No User Found With This Email')
          }

          if (!user.isVerified) {
            throw new Error('Please Verify Before Login!')
          }

          const comparePassword = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (comparePassword) {
            return user
          } else {
            throw new Error('Password Incorrect!')
          }
        } catch (err: any) {
          throw new Error(err)
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect()

      try {
        let existingUser = await UserModel.findOne({ email: user.email })
        if (!existingUser) {
          const emailUsername = user.email ? user.email.split('@')[0] : ''
          const sanitizedUsername = emailUsername
            .replace(/[^a-zA-Z0-9]/g, '')
            .substring(0, 20)
            .toLowerCase()
          const finalUsername =
            sanitizedUsername.length >= 3
              ? sanitizedUsername
              : 'user' + Math.random().toString(36).substring(2, 8)

          existingUser = new UserModel({
            username: finalUsername,
            email: user.email,
            isVerified: true
          })

          await existingUser.save()
        }

        user._id = (existingUser._id as mongoose.Types.ObjectId).toString()
        user.isVerified = existingUser.isVerified
        user.username = existingUser.username

        return true
      } catch (error) {
        console.error('Error during sign in:', error)
        return false
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = (user._id as unknown as string) || ''
        token.isVerified = user.isVerified
        token.username = user.username
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id as string
        session.user.isVerified = token.isVerified
        session.user.username = token.username
      }
      return session
    }
  },
  pages: {
    signIn: '/signin'
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.AUTH_SECRET
}
