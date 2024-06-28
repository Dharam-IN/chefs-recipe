import React, { useEffect } from 'react'
import Recipes from '../common/Recipes'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { LoaderIcon } from 'lucide-react';
import { fetchRecipes } from '@/lib/features/products/recipesSlice';

interface Recipe {
  _id: string;
  title: string;
  description: string;
  author: string;
  tags: Array<any>;
  image: string;
  type: string
}

const VegRecipes = () => {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector((state) => state.recipes.recipes) || [];
  const recipeStatus = useAppSelector((state) => state.recipes.loading);
  const recipeError = useAppSelector((state) => state.recipes.error);

  useEffect(() => {
    if (recipes.length === 0) {
      dispatch(fetchRecipes());
    }
  }, [dispatch, recipes]);

  if (recipeStatus) {
    return <div className="flex justify-center items-center h-screen"><LoaderIcon className='animate-spin text-9xl'/></div>;
  }

  if (recipeError) {
    return <div className="flex justify-center items-center h-screen">Failed to load recipes.</div>;
  }

  const vegetarianRecipes = recipes.filter((recipe: Recipe) => recipe.type == "vegetarian");
  const firstFourVegetarianRecipes = vegetarianRecipes.slice(0, 4)

  console.log(vegetarianRecipes)
  return (
    <>
      <Recipes heading={"Veg Recipes"} description={"Explore our collection of delicious vegetarian recipes."} data={firstFourVegetarianRecipes}/>
    </>
  )
}

export default VegRecipes
