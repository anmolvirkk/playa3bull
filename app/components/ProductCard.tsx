'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { dispatch } = useCart();
  if (!product) return null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  return (
    <div 
      className="animate-fade-in"
      style={{ 
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'forwards' 
      }}
    >
      <Link 
        href={`/product/${product.id}`}
        className="group relative flex flex-col h-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-2 border border-emerald-500/10 dark:border-emerald-500/5"
      >
        {/* Quick Add Button */}
        <button
          onClick={handleAddToCart}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 border border-emerald-500/10 hover:border-emerald-500/30"
        >
          <svg 
            className="w-5 h-5 text-emerald-600 dark:text-emerald-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
            />
          </svg>
        </button>

        {/* Image Container */}
        <div className="relative pt-[100%] overflow-hidden bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.1),rgba(255,255,255,0))]" />
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-110"
          />
          {/* Category Tag */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-medium bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full border border-emerald-500/10">
              {product.category}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative flex flex-col flex-grow p-6">
          {/* Title & Rating */}
          <div className="mb-4">
            <h3 className="text-lg font-medium line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
              {product.title}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i}
                    className={`text-sm ${
                      i < Math.round(product.rating.rate)
                        ? 'text-emerald-500 dark:text-emerald-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-500">
                ({product.rating.count})
              </span>
            </div>
          </div>
          
          {/* Price & Action */}
          <div className="mt-auto pt-4 border-t border-emerald-500/10 dark:border-emerald-500/5">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
                ${product.price.toFixed(2)}
              </span>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 group-hover:bg-emerald-500 dark:group-hover:bg-emerald-500 transition-colors duration-300">
                <svg 
                  className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors duration-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
} 