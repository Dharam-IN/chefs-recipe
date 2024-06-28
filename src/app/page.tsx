'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { fetchRecipes } from '../lib/features/products/recipesSlice';
import { LoaderIcon } from 'lucide-react';
import HeroSection from '@/components/Home/Hero';
import Recipes from '@/components/common/Recipes';
import VegRecipes from '@/components/Home/VegRecipes';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector((state) => state.recipes.recipes) || [];
  const recipeStatus = useAppSelector((state) => state.recipes.loading);
  const recipeError = useAppSelector((state) => state.recipes.error);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  if (recipeStatus) {
    return <div><LoaderIcon className='animate-spin text-9xl'/></div>;
  }

  if (recipeError) {
    return <div>Failed to load products.</div>;
  }

  return (
    <>
    <HeroSection/>
    <VegRecipes/>
    </>
  );
}
