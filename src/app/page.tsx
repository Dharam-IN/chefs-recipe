'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { fetchProducts } from '../lib/features/products/productsSlice';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const productStatus = useAppSelector((state) => state.products.status);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  if (productStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (productStatus === 'failed') {
    return <div>Failed to load products.</div>;
  }
  console.log(products)
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <img src={product.thumbnail} alt={product.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}
