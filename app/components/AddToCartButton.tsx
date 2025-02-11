'use client';

import { useCart } from '../context/CartContext';
import { Product } from '../types';

export default function AddToCartButton({ product }: { product: Product }) {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-300 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
    >
      <svg 
        className="w-5 h-5" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
        />
      </svg>
      Add to Cart
    </button>
  );
} 