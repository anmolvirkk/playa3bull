'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { state } = useCart();
  
  return (
    <header className="fixed w-full top-0 z-50">
      <div className="absolute inset-0 bg-white/40 dark:bg-gray-950/40 backdrop-blur-xl" />
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-emerald-500/20 dark:via-emerald-500/10 to-transparent" />
      <div className="container relative mx-auto px-4 sm:px-6 h-14 sm:h-16">
        <nav className="flex justify-between items-center h-full">
          <Link 
            href="/" 
            className="text-xl sm:text-2xl font-bold tracking-tight hover:opacity-75 transition-opacity"
          >
            <span className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 bg-clip-text text-transparent">
              Store
            </span>
          </Link>
          
          <Link href="/cart" className="relative">
            <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border border-emerald-500/10 dark:border-emerald-500/5 shadow-lg shadow-emerald-500/5 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition-all duration-300">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-gray-700 dark:text-gray-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              {state.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-[scale-in_0.2s_ease-out]">
                  {state.items.length}
                </span>
              )}
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">
                Cart
              </span>
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
} 