'use client';

const sortOptions = [
  { id: 'default', label: 'Featured' },
  { id: 'price-asc', label: '$ Low-High' },
  { id: 'price-desc', label: '$ High-Low' },
  { id: 'rating', label: 'Top Rated' },
  { id: 'popularity', label: 'Popular' },
];

interface SortOptionsProps {
  currentSort: string;
  onSortChange: (sort: string) => void;
}

export function SortOptions({ currentSort, onSortChange }: SortOptionsProps) {
  return (
    <div className="relative w-full sm:w-40">
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="w-full appearance-none px-4 py-2.5 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-emerald-500/10 dark:border-emerald-500/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm"
      >
        {sortOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
} 