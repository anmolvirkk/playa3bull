'use client';

import { useEffect, useRef } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface InfiniteScrollProps {
  products: Product[];
  loadMore: () => void;
  hasMore: boolean;
}

export function InfiniteScroll({ products, loadMore, hasMore }: InfiniteScrollProps) {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loadMore, hasMore]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            index={index}
          />
        ))}
      </div>
      {hasMore && (
        <div 
          ref={observerTarget} 
          className="w-full h-20 flex items-center justify-center mt-8"
        >
          <div className="w-8 h-8 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      )}
    </>
  );
} 