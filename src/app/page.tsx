'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { fetchRecipes } from '../lib/features/products/recipesSlice';
import { LoaderIcon } from 'lucide-react';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.recipes.recipes) || [];
  const productStatus = useAppSelector((state) => state.recipes.loading);
  const productError = useAppSelector((state) => state.recipes.error);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  if (productStatus) {
    return <div><LoaderIcon className='animate-spin text-9xl'/></div>;
  }

  if (productError) {
    return <div>Failed to load products.</div>;
  }

  console.log(products);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <img src={product.image} alt={product.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}
