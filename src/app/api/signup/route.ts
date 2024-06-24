import { NextResponse } from 'next/server';
import UserModel from '@/model/user.model';
import dbConnect from '@/lib/dbConnect';
import bcryptjs from 'bcryptjs';
import { createErrorResponse, createSuccessResponse } from '@/app/utils/ApiResponse';
import sendEmail from '@/helper/sendVerificationEmail';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password, restaurant, gender } = await request.json();

    const existingUserByUsernameVerified = await UserModel.findOne({ username, isVerified: true });

    if (existingUserByUsernameVerified) {
      return NextResponse.json(createErrorResponse("Username already exists and is verified.", 400), { status: 400 });
    }

    const existingUserByEmail = await UserModel.findOne({ email });

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return NextResponse.json(createErrorResponse("This Email Already Exists", 400), { status: 400 });
      }

      const hashedPassword = await bcryptjs.hash(password, 10);
      existingUserByEmail.password = hashedPassword;
      existingUserByEmail.verifyCode = verifyCode;
      existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);

      await existingUserByEmail.save();
    } else {
      const hashedPassword = await bcryptjs.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        restaurant,
        gender,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
      });

      await newUser.save();
    }

    const emailResponse = await sendEmail(email, username, verifyCode);

    if (!emailResponse.success) {
      return NextResponse.json(createErrorResponse(emailResponse.message, 500), { status: 500 });
    }

    return NextResponse.json(createSuccessResponse(null, "User Registered Successfully!", 200), { status: 200 });
  } catch (error) {
    console.error("Error Signing up User:", error);
    return NextResponse.json(createErrorResponse("Error Signing up user.", 500), { status: 500 });
  }
}
