'use client'
import { fetchRecipes } from '@/lib/features/products/recipesSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { LoaderIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'

interface RecipePage {
  _id: string
  title: string
  description: string
  author: string
  tags: string[]
  image: string
  ingredients: Ingredient[]
  instructions: string[]
  type: string
  updatedAt: string
  popular: string
}

interface Ingredient {
  name: string
  quantity: string
}

const Recipe: React.FC = () => {
  const params = useParams() as { id: string }

  const dispatch = useAppDispatch()
  const recipes = useAppSelector(state => state.recipes.recipes) || []
  const recipeStatus = useAppSelector(state => state.recipes.loading)
  const recipeError = useAppSelector(state => state.recipes.error)

  React.useEffect(() => {
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

  const pageRecipe = recipes.find(
    (recipe: RecipePage) => recipe._id === params.id
  )
  console.log(pageRecipe)

  let updatedAtDate: Date | null = null
  let dateTimeString = ''
  let titleString = ''
  let displayDateString = ''

  if (pageRecipe && pageRecipe.updatedAt) {
    updatedAtDate = new Date(pageRecipe.updatedAt)
    dateTimeString = updatedAtDate.toISOString().split('T')[0]
    titleString = updatedAtDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    displayDateString = updatedAtDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
      <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header className="mb-4 lg:mb-6 not-format">
            <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
              <img
                className="mr-4 w-16 h-16 rounded-full"
                src={pageRecipe?.image}
                alt={pageRecipe?.author}
              />
              <div>
                <a
                  href="#"
                  rel="author"
                  className="text-xl font-bold text-gray-900 dark:text-white"
                >
                  {pageRecipe?.author}
                </a>
                <p className="text-base text-gray-500 dark:text-gray-400">
                  Recipe - {pageRecipe?.type}
                </p>
                <p className="text-base text-gray-500 dark:text-gray-400">
                  <time dateTime={dateTimeString} title={titleString}>
                    {displayDateString}
                  </time>
                </p>
              </div>
            </div>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
              {pageRecipe?.title}
            </h1>
          </header>
          <p className="lead font-bold text-2xl mb-3">
            {pageRecipe?.description}
          </p>
          <figure>
            <img
              src={pageRecipe?.image}
              className="w-full"
              alt={`Digital art by ${pageRecipe?.author}`}
            />
            <figcaption className="font-[700] py-3">
              Blog Post by {pageRecipe?.author}
            </figcaption>
          </figure>
          <h2 className="text-2xl font-bold">
            Ingredients Needed for This Recipe
          </h2>
          <ol className="py-3">
            {pageRecipe?.ingredients.map((ingredient, index) => (
              <li key={index} className="list-disc">
                <strong>{ingredient.name}:</strong> {ingredient.quantity}
              </li>
            ))}
          </ol>
          <h2 className="text-2xl font-bold">Steps to Follow</h2>
          <ol className="py-3">
            {pageRecipe?.instructions.map((instruction, index) => (
              <li key={index} className="mb-3">
                <strong className="block">Step {index + 1}:</strong>{' '}
                {instruction}
              </li>
            ))}
          </ol>
          <p>Now your dish is ready to eat.</p>
          <div className="py-3">
            {pageRecipe?.tags.map((tag, index) => (
              <span key={index} className="mr-2">
                #{tag}
              </span>
            ))}
          </div>
        </article>
      </div>
    </main>
  )
}

export default Recipe
