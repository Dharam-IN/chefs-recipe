import { createErrorResponse, createSuccessResponse } from "@/app/utils/ApiResponse";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { NextResponse } from "next/server";

export async function GET(request: Request){
    await dbConnect();
    try {
        const getChefs = await UserModel.find({usertype: "chef"});
        console.log(getChefs);

        if(!getChefs){
            return NextResponse.json(createErrorResponse("Chef's Not Found", 404));
        }

        return NextResponse.json(createSuccessResponse(getChefs, "All Chefs", 201));

    } catch (error) {
        console.log("Error in chefs", error);
        return NextResponse.json(createErrorResponse("Error in found chef's", 500))
    }
}
