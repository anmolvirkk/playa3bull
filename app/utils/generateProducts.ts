import { Product } from '../types';

function generateVariantTitle(baseTitle: string, variant: number): string {
  const variants = [
    'Premium', 'Pro', 'Elite', 'Limited Edition', 'Classic', 
    'Signature', 'Plus', 'Max', 'Ultra', 'Advanced'
  ];
  return `${baseTitle} ${variants[variant % variants.length]}`;
}

function adjustPrice(basePrice: number, variant: number): number {
  const multiplier = 0.8 + (variant * 0.2); // Creates price variation
  return Number((basePrice * multiplier).toFixed(2));
}

function adjustRating(baseRating: number, variant: number): number {
  const adjustment = (variant % 5 - 2) * 0.2; // Creates rating variation
  return Number(Math.min(5, Math.max(1, baseRating + adjustment)).toFixed(1));
}

// Fallback products in case API fails
const fallbackProducts: Product[] = [
  {
    id: 1,
    title: "Sample Product",
    price: 99.99,
    description: "A high-quality product for testing purposes",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 4.5, count: 120 }
  },
  // Add a few more fallback products...
];

export async function getEnhancedProducts(): Promise<Product[]> {
  try {
    const res = await fetch('https://fakestoreapi.com/products', {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const text = await res.text(); // Get response as text first
    
    // Validate JSON before parsing
    let baseProducts: Product[];
    try {
      baseProducts = JSON.parse(text);
      if (!Array.isArray(baseProducts)) {
        throw new Error('Response is not an array');
      }
    } catch (parseError) {
      console.error('Failed to parse products JSON:', parseError);
      console.log('Response text:', text);
      baseProducts = fallbackProducts;
    }

    const enhancedProducts: Product[] = [];

    // Generate variants for each base product
    baseProducts.forEach((baseProduct) => {
      if (!baseProduct || typeof baseProduct !== 'object') return;

      // Validate required fields
      if (!baseProduct.id || !baseProduct.title || !baseProduct.price) return;

      // Add the original product
      enhancedProducts.push(baseProduct);

      // Create variants
      for (let i = 1; i <= 4; i++) {
        enhancedProducts.push({
          ...baseProduct,
          id: baseProduct.id * 100 + i,
          title: generateVariantTitle(baseProduct.title, i),
          price: adjustPrice(baseProduct.price, i),
          rating: {
            rate: adjustRating(baseProduct.rating?.rate || 4, i),
            count: (baseProduct.rating?.count || 100) + (i * 50),
          },
        });
      }
    });

    // Shuffle the array
    const shuffled = [...enhancedProducts].sort(() => Math.random() - 0.5);

    // Return at least 20 products
    return shuffled.length >= 20 ? shuffled : [...shuffled, ...fallbackProducts];

  } catch (error) {
    console.error('Error fetching and generating products:', error);
    // Return fallback products if everything fails
    return fallbackProducts.reduce((acc, product) => {
      acc.push(product);
      for (let i = 1; i <= 4; i++) {
        acc.push({
          ...product,
          id: product.id * 100 + i,
          title: generateVariantTitle(product.title, i),
          price: adjustPrice(product.price, i),
          rating: {
            rate: adjustRating(product.rating.rate, i),
            count: product.rating.count + (i * 50),
          },
        });
      }
      return acc;
    }, [] as Product[]);
  }
} 