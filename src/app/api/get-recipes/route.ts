import {
  createErrorResponse,
  createSuccessResponse
} from '@/app/utils/ApiResponse'
import dbConnect from '@/lib/dbConnect'
import RecipeModel from '@/model/recipe.model'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  await dbConnect()
  try {
    const getRecipes = await RecipeModel.find()
    console.log(getRecipes)

    if (!getRecipes) {
      return NextResponse.json(createErrorResponse('Recipes Not Found', 404))
    }

    return NextResponse.json(
      createSuccessResponse(getRecipes, 'All Recipes', 201)
    )
  } catch (error) {
    console.log('Error in Recipes', error)
    return NextResponse.json(createErrorResponse('Error in found Recipes', 500))
  }
}
