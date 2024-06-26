import { NextResponse } from 'next/server';
import UserModel from '@/model/user.model';
import dbConnect from '@/lib/dbConnect';
import bcryptjs from 'bcryptjs';
import sendEmail from '@/helper/sendVerificationEmail';
import { createErrorResponse, createSuccessResponse } from '@/app/utils/ApiResponse';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, email, password, restaurant, gender, usertype } = await request.json();
        const lowerCaseUsername = username.toLowerCase();

        if (!usertype) {
            return NextResponse.json(createErrorResponse("Usertype is required", 400), { status: 400 });
        }

        const existingUserByUsernameVerified = await UserModel.findOne({ username: lowerCaseUsername, isVerified: true });

        if (existingUserByUsernameVerified) {
            return NextResponse.json(createErrorResponse("Username already exists and is verified.", 400), { status: 400 });
        }

        const existingUserByEmail = await UserModel.findOne({ email });

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return NextResponse.json(createErrorResponse("This Email Already Exists", 400), { status: 400 });
            }

            existingUserByEmail.username = lowerCaseUsername;
            existingUserByEmail.password = await bcryptjs.hash(password, 10);
            existingUserByEmail.restaurant = restaurant;
            existingUserByEmail.gender = gender;
            existingUserByEmail.usertype = usertype;
            existingUserByEmail.verifyCode = verifyCode;
            existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

            await existingUserByEmail.save();

            const emailrespo = await sendEmail(email, lowerCaseUsername, verifyCode);
            if (!emailrespo.success) {
                return NextResponse.json(createErrorResponse("Error in Email send", 500), { status: 500 });
            }

            return NextResponse.json(createSuccessResponse(null, "Verification Code Sent to Your Email", 200), { status: 200 });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = new UserModel({
            username: lowerCaseUsername,
            email,
            password: hashedPassword,
            restaurant,
            gender,
            usertype,
            verifyCode,
            verifyCodeExpiry: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
        });

        await user.save();

        await sendEmail(email, lowerCaseUsername, verifyCode);

        return NextResponse.json(createSuccessResponse(null, "Verification Code Sent to Your Email", 200), { status: 200 });

    } catch (error: any) {
        console.error(error);
        return NextResponse.json(createErrorResponse("An Error Occurred", 500), { status: 500 });
    }
}
