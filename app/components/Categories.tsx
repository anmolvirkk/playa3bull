'use client';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'jewelery', label: 'Jewelry' },
  { id: "men's clothing", label: "Men's" },
  { id: "women's clothing", label: "Women's" },
];

interface CategoriesProps {
  currentCategory: string;
  onCategoryChange: (category: string) => void;
}

export function Categories({ currentCategory, onCategoryChange }: CategoriesProps) {
  return (
    <div className="overflow-auto hide-scrollbar">
      <div className="flex gap-2 px-4 py-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex-none px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm
              ${category.id === currentCategory 
                ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-green-500/20'
                : 'bg-white/50 dark:bg-gray-800/50 backdrop-blur-md hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
              }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
} 