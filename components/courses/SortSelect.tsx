'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface SortSelectProps {
  current: string;
}

export default function SortSelect({ current }: SortSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <select
      className="form-select form-select-sm"
      value={current}
      onChange={(e) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', e.target.value);
        params.set('page', '1');
        router.push(`/courses?${params.toString()}`);
      }}
    >
      <option value="newest">Newest</option>
      <option value="rating">Highest Rated</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="title">Alphabetical</option>
    </select>
  );
}
