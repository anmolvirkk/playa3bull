'use client';

import { useEffect, useState } from 'react';
import { Product } from './types';
import { Categories } from './components/Categories';
import { SortOptions } from './components/SortOptions';
import { InfiniteScroll } from './components/InfiniteScroll';
import { getEnhancedProducts } from './utils/generateProducts';

const ITEMS_PER_PAGE = 8;

async function getProducts(): Promise<Product[]> {
  return getEnhancedProducts();
}

export default function Home() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('default');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch initial products
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setAllProducts(products);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...allProducts];

    // Apply category filter
    if (category !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating.rate - a.rating.rate;
        case 'popularity':
          return b.rating.count - a.rating.count;
        default:
          return 0;
      }
    });

    // Reset page and update displayed products
    setPage(1);
    setDisplayedProducts(filtered.slice(0, ITEMS_PER_PAGE));
  }, [allProducts, category, sort]);

  // Load more function for infinite scroll
  const loadMore = () => {
    let filtered = [...allProducts];
    
    if (category !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating.rate - a.rating.rate;
        case 'popularity':
          return b.rating.count - a.rating.count;
        default:
          return 0;
      }
    });

    const nextPage = page + 1;
    const newProducts = filtered.slice(0, nextPage * ITEMS_PER_PAGE);
    setDisplayedProducts(newProducts);
    setPage(nextPage);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-14 sm:pt-16">
      {/* Hero Section */}
      <section className="relative h-[30vh] sm:h-[40vh] min-h-[250px] sm:min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-teal-500/20 dark:from-emerald-900/30 dark:via-green-900/20 dark:to-teal-900/30" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
        <div className="relative z-10 text-center px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 bg-clip-text text-transparent">
            Discover Amazing Products
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-base sm:text-lg md:text-xl">
            Curated collection of premium products for your lifestyle
          </p>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="relative py-12 sm:py-20 px-4 sm:px-6">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-emerald-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-0 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-green-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-48 sm:w-64 h-48 sm:h-64 bg-teal-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />

        <div className="container mx-auto max-w-7xl">
          {/* Filters and Sort */}
          <div className="mb-8">
            {/* Mobile View */}
            <div className="sm:hidden space-y-4">
              <SortOptions 
                currentSort={sort} 
                onSortChange={setSort} 
              />
              <div className="-mx-4">
                <Categories 
                  currentCategory={category} 
                  onCategoryChange={setCategory} 
                />
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden sm:flex sm:items-center gap-6">
              <div className="flex-1">
                <Categories 
                  currentCategory={category} 
                  onCategoryChange={setCategory} 
                />
              </div>
              <SortOptions 
                currentSort={sort} 
                onSortChange={setSort} 
              />
            </div>
          </div>

          {/* Products Grid with Infinite Scroll */}
          <InfiniteScroll
            products={displayedProducts}
            loadMore={loadMore}
            hasMore={displayedProducts.length < allProducts.length}
          />
        </div>
      </section>
    </main>
  );
}
