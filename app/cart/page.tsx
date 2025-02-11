'use client';

import { useCart } from '../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen pt-14 sm:pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 sm:w-24 h-20 sm:h-24 mx-auto mb-6 sm:mb-8 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
              <svg 
                className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Your cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-colors text-sm sm:text-base"
            >
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M7 16l-4-4m0 0l4-4m-4 4h18" 
                />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-14 sm:pt-28 pb-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h1 className="text-xl sm:text-3xl font-bold mb-6 sm:mb-8">Shopping Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-8 sm:gap-12">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {state.items.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-xl sm:rounded-2xl overflow-hidden border border-emerald-500/10 dark:border-emerald-500/5 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-4 sm:gap-6 p-4 sm:p-6">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <Link 
                      href={`/product/${item.id}`}
                      className="text-base sm:text-lg font-medium hover:text-emerald-500 transition-colors line-clamp-2"
                    >
                      {item.title}
                    </Link>
                    
                    <div className="mt-1 flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-emerald-500">★</span>
                        <span>{item.rating.rate}</span>
                      </div>
                      <span className="text-gray-500">
                        ({item.rating.count})
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-4 sm:gap-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/20 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-6 sm:w-8 text-center text-sm sm:text-base">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/20 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      
                      <span className="font-medium text-base sm:text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <svg 
                    className="w-4 h-4 sm:w-5 sm:h-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          <div className="lg:sticky lg:top-32 h-fit">
            <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-xl sm:rounded-2xl border border-emerald-500/10 dark:border-emerald-500/5 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Order Summary</h2>
              
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-medium">${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="text-emerald-500 font-medium">Free</span>
                </div>
                <div className="border-t border-emerald-500/10 dark:border-emerald-500/5 pt-3 sm:pt-4">
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-lg sm:text-xl">
                      ${state.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full font-medium sm:font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-300 shadow-lg shadow-emerald-500/20">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 