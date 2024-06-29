import dbConnect from '@/lib/dbConnect'
import { UsernameValidation } from '@/schema/SignupSchema'
import { z } from 'zod'
import UserModel from '@/model/user.model'
import { NextResponse } from 'next/server'
import {
  createErrorResponse,
  createSuccessResponse
} from '@/app/utils/ApiResponse'

const UsernameQuerySchema = z.object({
  username: UsernameValidation.transform(val => val.toLowerCase())
})

export async function GET(request: Request) {
  await dbConnect()

  try {
    const { searchParams } = new URL(request.url)
    const queryParams = {
      username: (searchParams.get('username') || '').toLowerCase()
    }

    const result = UsernameQuerySchema.safeParse(queryParams)

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || []
      return NextResponse.json(
        createErrorResponse(
          usernameErrors?.length > 0
            ? usernameErrors.join(', ')
            : 'Invalid query parameters',
          404
        ),
        { status: 404 }
      )
    }

    const { username } = result.data

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true
    })

    if (existingVerifiedUser) {
      return NextResponse.json(
        createErrorResponse('Username is already taken', 200),
        { status: 200 }
      )
    }

    return NextResponse.json(
      createSuccessResponse(null, 'Username is unique', 200),
      { status: 200 }
    )
  } catch (error) {
    console.error('Error checking username:', error)
    return NextResponse.json(
      createErrorResponse('Error checking username', 500),
      { status: 500 }
    )
  }
}
