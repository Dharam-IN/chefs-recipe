import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import RecipeModel from "@/model/recipe.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { createErrorResponse, createSuccessResponse } from "@/app/utils/ApiResponse";

export async function POST(request: Request){
    await dbConnect();

    try {

        const session = await getServerSession(authOptions);

        if(!session){
            return NextResponse.json(createErrorResponse("User not authorized", 401));
        }

        const userId = session.user._id;
        const ObjectId = mongoose.Types.ObjectId.createFromHexString(userId)

        const data = await request.json();
        console.log("Recipe Data:- ", data);

        const {title, description, author, tags, image, ingredients, instructions} = data;

        const newRecipe = new RecipeModel({
            userId: ObjectId,
            title,
            description,
            author,
            tags,
            image,
            ingredients,
            instructions
        })

        await newRecipe.save()

        return NextResponse.json(createSuccessResponse(null, "Data Save in", 201));

    } catch (error) {
        console.log("Error in Recipe Save", error)
        return NextResponse.json(createErrorResponse("Error in Recipe Save", 500))
    }

}
