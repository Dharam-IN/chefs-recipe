import React from 'react'
import RecipeCard from './RecipeCard'

interface RecipeProps {
  heading: string
  description: string
  data: Array<any>
}

const Recipes: React.FC<RecipeProps> = ({ heading, description, data }) => {
  return (
    <>
      <div className="mx-auto max-w-2xl lg:text-center">
        <p className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          {heading}
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-400">{description}</p>
      </div>
      <div className="mx-auto mt-7">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 lg:gap-y-16">
          {data.map((feature: any) => (
            <RecipeCard
              key={feature._id}
              imageUrl={feature.image}
              category={feature.type}
              description={feature.description}
              title={feature.title}
              pageid={feature._id}
            />
          ))}
        </dl>
      </div>
    </>
  )
}

export default Recipes
