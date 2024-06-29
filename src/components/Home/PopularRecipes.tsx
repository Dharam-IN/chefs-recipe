'use client'
import * as React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchRecipes } from "@/lib/features/products/recipesSlice";
import { LoaderIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge"
import { Button } from "@react-email/components";
import Link from "next/link";

interface Recipe {
  _id: string;
  title: string;
  description: string;
  author: string;
  tags: Array<any>;
  image: string;
  type: string;
  popular: string;
}

export function PopularRecipes() {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector((state) => state.recipes.recipes) || [];
  const recipeStatus = useAppSelector((state) => state.recipes.loading);
  const recipeError = useAppSelector((state) => state.recipes.error);

  React.useEffect(() => {
    if (recipes.length === 0) {
      dispatch(fetchRecipes());
    }
  }, [dispatch, recipes]);

  if (recipeStatus) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderIcon className="animate-spin text-9xl" />
      </div>
    );
  }

  if (recipeError) {
    return (
      <div className="flex justify-center items-center h-screen">
        Failed to load recipes.
      </div>
    );
  }

  const PopularRecipes = recipes.filter((recipe: Recipe) => recipe.popular === "true");
  console.log(PopularRecipes);
  
  const descLength = 80;

  return (
    <main className="container mx-auto py-20 sm:px-10 px-5">
      <div className="mx-auto max-w-2xl lg:text-center">
        <p className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Popular Recipes You Can't Miss
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-400">
        From comfort food classics to exotic flavors, our featured recipes are sure to impress
        </p>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {PopularRecipes.map((recipe, index) => (
            <CarouselItem key={recipe._id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1 relative">
                <Card className="relative">
                <CardHeader>
                  <div className="w-full h-[250px]">
                    {/* <Image src={recipe.image} fill={true} alt={recipe.image}/> */}
                    <img src={recipe.image} alt="image" className="w-full h-full object-cover" />
                  </div>
                </CardHeader>
                  <CardContent className="px-6">
                    <CardTitle className="mb-3">{recipe.title}</CardTitle>
                    <CardDescription>{recipe.description.length > descLength ? `${recipe.description.slice(0, descLength)}...` : recipe.description}</CardDescription>
                    <Link href={`/recipe/${recipe._id}`} className="mt-3 bg-primary text-white font-bold dark:bg-white dark:text-black text-center py-2 rounded-md block">Cook This</Link>
                  </CardContent>
                  <Badge className="absolute top-6 left-0 bg-secondary text-white -rotate-45" variant="outline">{recipe.type}</Badge>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
}
