'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks'; // Ensure custom hooks are used
import { fetchRecipes, selectError, selectLoading, selectRecipes } from '@/slices/recipesSlice';

const Recipes: React.FC = () => {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector(selectRecipes);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);
  console.log(recipes)
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h1>Recipe List</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>{recipe.title}</li>
        ))}
      </ul>
    </>
  );
};

export default Recipes;

// 'use client'
// import React from 'react'

// const Recipes = () => {
//   return (
//     <div>
//       india
//     </div>
//   )
// }

// export default Recipes
