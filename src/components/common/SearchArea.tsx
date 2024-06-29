'use client'
import { fetchRecipes } from '@/lib/features/products/recipesSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { LoaderIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'

interface Recipe {
  _id: string
  title: string
  description: string
  author: string
  tags: Array<any>
  image: string
  type: string
  popular: string
}

const SearchArea = ({ searchQuery }: { searchQuery: string }) => {
  console.log(searchQuery)

  const dispatch = useAppDispatch()
  const recipes = useAppSelector(state => state.recipes.recipes)
  const recipeStatus = useAppSelector(state => state.recipes.loading)
  const recipeError = useAppSelector(state => state.recipes.error)

  useEffect(() => {
    if (recipes.length === 0) {
      dispatch(fetchRecipes())
    }
  }, [dispatch, recipes])

  if (recipeStatus) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderIcon className="animate-spin text-9xl" />
      </div>
    )
  }

  if (recipeError) {
    return (
      <div className="flex justify-center items-center h-screen">
        Failed to load recipes.
      </div>
    )
  }

  console.log(recipes)

  const searchData = recipes.filter((recipe: Recipe) => {
    const query = searchQuery.toLowerCase()
    return (
      recipe.title.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(query))
    )
  })
  console.log(searchData)

  return (
    <>
      <div
        className={`absolute lg:p-0 p-5 top-10 left-0 w-full px-10 ${searchData.length > 3 ? 'h-[300px]' : 'h-fit'} overflow-y-scroll z-50`}
      >
        <div className="bg-gray-100 shadow-2xl dark:bg-gray-800 lg:p-2 p-4">
          {searchData.map(recipe => {
            return (
              <>
                <Link href={`/recipe/${recipe._id}`}>
                  <div className="flex justify-start w-full dark:hover:bg-gray-700 hover:bg-gray-200 p-3 gap-3 mb-3">
                    <div className="lg:w-[100px] lg:h-[100px] w-[30%] rounded-md overflow-hidden">
                      <img
                        src={recipe.image}
                        className="object-cover w-full h-full"
                        alt="image"
                      />
                    </div>
                    <div className="w-[70%]">
                      <h4 className="font-bold md:text-[16px] text-[12px]">
                        {recipe.title}
                      </h4>
                      <p className="text-gray-700 md:text-[16px] text-[12px] dark:text-gray-200">
                        {recipe.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </>
            )
          })}
          {searchData.length === 0 && (
            <div className="px-4 py-2 text-gray-500">No results found.</div>
          )}
        </div>
      </div>
    </>
  )
}

export default SearchArea
