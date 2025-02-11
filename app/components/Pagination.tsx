'use client';

import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  return (
    <div className="flex justify-center gap-2 mt-8">
      {currentPage > 1 && (
        <Link
          href={`/?page=${currentPage - 1}`}
          className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Previous
        </Link>
      )}
      
      {currentPage < totalPages && (
        <Link
          href={`/?page=${currentPage + 1}`}
          className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Next
        </Link>
      )}
    </div>
  );
} 