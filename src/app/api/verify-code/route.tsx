import {
  createErrorResponse,
  createSuccessResponse
} from '@/app/utils/ApiResponse'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/model/user.model'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  await dbConnect()
  try {
    const { username, code } = await request.json()

    const user = await UserModel.findOne({ username: username })

    if (!user) {
      return NextResponse.json(createErrorResponse('User not found', 400), {
        status: 400
      })
    }

    const isValidCode = user.verifyCode === code

    const isCodeNotExpire = new Date(user.verifyCodeExpiry) > new Date()

    if (isValidCode && isCodeNotExpire) {
      user.isVerified = true
      await user.save()

      return NextResponse.json(
        createSuccessResponse(null, 'Account Verify Successfuly', 200),
        { status: 200 }
      )
    } else if (!isCodeNotExpire) {
      return NextResponse.json(
        createErrorResponse('Verify Code Expire! | Please Signup Again', 500),
        { status: 500 }
      )
    }

    return NextResponse.json(
      createErrorResponse('Incorrect Verification Code', 401),
      { status: 401 }
    )
  } catch (error) {
    console.log('Error in Verify Code:- ', error)
    NextResponse.json(createErrorResponse('Error User Verify', 500), {
      status: 500
    })
  }
}
