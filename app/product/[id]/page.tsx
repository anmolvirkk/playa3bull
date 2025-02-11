import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/app/types';
import AddToCartButton from '@/app/components/AddToCartButton';
import { notFound } from 'next/navigation';

// Helper function to validate product ID
function isValidProductId(id: string): boolean {
  const numId = parseInt(id, 10);
  return !isNaN(numId) && numId > 0 && numId <= 2000; // Assuming max 2000 products
}

async function getProduct(id: string): Promise<Product | null> {
  if (!isValidProductId(id)) {
    return null;
  }

  try {
    // First try to get from enhanced products
    const res = await fetch('https://fakestoreapi.com/products', {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const products: Product[] = await res.json();
    const baseId = Math.floor(parseInt(id) / 100) || parseInt(id);
    const baseProduct = products.find(p => p.id === baseId);

    if (!baseProduct) {
      return null;
    }

    // If it's a variant ID, generate the variant
    if (baseId !== parseInt(id)) {
      const variantNum = parseInt(id) % 100;
      return {
        ...baseProduct,
        id: parseInt(id),
        title: `${baseProduct.title} ${['Premium', 'Pro', 'Elite', 'Limited Edition'][variantNum - 1] || 'Special'}`,
        price: Number((baseProduct.price * (0.8 + variantNum * 0.2)).toFixed(2)),
        rating: {
          rate: Number(Math.min(5, Math.max(1, baseProduct.rating.rate + (variantNum % 5 - 2) * 0.2)).toFixed(1)),
          count: baseProduct.rating.count + (variantNum * 50),
        },
      };
    }

    return baseProduct;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

interface PageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: PageProps) {
  // Validate and sanitize the ID
  const sanitizedId = params?.id?.replace(/[^0-9]/g, '');
  
  if (!sanitizedId || !isValidProductId(sanitizedId)) {
    notFound();
  }

  const product = await getProduct(sanitizedId);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative aspect-square bg-white dark:bg-gray-800 rounded-3xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-8"
                priority
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-6">
                <div className="inline-block px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-full text-sm text-emerald-600 dark:text-emerald-400 mb-4">
                  {product.category}
                </div>
                <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <span className="text-emerald-500">★</span>
                    <span>{product.rating.rate}</span>
                  </div>
                  <span className="text-gray-500">
                    ({product.rating.count} reviews)
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {product.description}
                </p>
              </div>

              <div className="mt-auto">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 