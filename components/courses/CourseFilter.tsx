'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Category {
  id: number;
  name: string;
  categories: Category[];
}

interface SkillLevel {
  id: number;
  name: string;
}

interface CourseFilterProps {
  categories: Category[];
  levels: SkillLevel[];
}

export default function CourseFilter({ categories, levels }: CourseFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('categoryId') || '');
  const [selectedLevel, setSelectedLevel] = useState<string>(searchParams.get('levelId') || '');
  const [isFree, setIsFree] = useState<string>(searchParams.get('isFree') || '');

  // Update state when URL changes
  useEffect(() => {
    setSelectedCategory(searchParams.get('categoryId') || '');
    setSelectedLevel(searchParams.get('levelId') || '');
    setIsFree(searchParams.get('isFree') || '');
  }, [searchParams]);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Reset page to 1 when filtering
    params.set('page', '1');
    router.push(`/courses?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/courses');
  };

  return (
    <div className="card shadow border-0 mb-4">
      <div className="card-header bg-light border-bottom py-3">
        <h5 className="mb-0">Filter</h5>
      </div>
      <div className="card-body">
        {/* Category */}
        <div className="mb-4">
          <h6 className="mb-2">Category</h6>
          <select 
            className="form-select form-select-sm" 
            value={selectedCategory}
            onChange={(e) => handleFilterChange('categoryId', e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <optgroup key={cat.id} label={cat.name}>
                {/* Check if category has subcategories or is selectable itself */}
                 <option value={cat.id}>{cat.name}</option>
                {cat.categories && cat.categories.map((sub) => (
                  <option key={sub.id} value={sub.id}>&nbsp;&nbsp;{sub.name}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Level */}
        <div className="mb-4">
          <h6 className="mb-2">Skill Level</h6>
          {levels.map((level) => (
            <div className="form-check" key={level.id}>
              <input 
                className="form-check-input" 
                type="radio" 
                name="level" 
                id={`level-${level.id}`}
                checked={selectedLevel === level.id.toString()}
                onChange={() => handleFilterChange('levelId', level.id.toString())}
              />
              <label className="form-check-label" htmlFor={`level-${level.id}`}>
                {level.name}
              </label>
            </div>
          ))}
          <div className="form-check">
            <input 
                className="form-check-input" 
                type="radio" 
                name="level" 
                id="level-all"
                checked={selectedLevel === ''}
                onChange={() => handleFilterChange('levelId', '')}
            />
            <label className="form-check-label" htmlFor="level-all">
                All Levels
            </label>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <h6 className="mb-2">Price</h6>
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="radio" 
              name="price" 
              id="price-all"
              checked={isFree === ''}
              onChange={() => handleFilterChange('isFree', '')}
            />
            <label className="form-check-label" htmlFor="price-all">
              All
            </label>
          </div>
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="radio" 
              name="price" 
              id="price-free"
              checked={isFree === 'true'}
              onChange={() => handleFilterChange('isFree', 'true')}
            />
            <label className="form-check-label" htmlFor="price-free">
              Free
            </label>
          </div>
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="radio" 
              name="price" 
              id="price-paid"
              checked={isFree === 'false'}
              onChange={() => handleFilterChange('isFree', 'false')}
            />
            <label className="form-check-label" htmlFor="price-paid">
              Paid
            </label>
          </div>
        </div>

        {/* Clear button */}
        <div className="d-grid">
          <button className="btn btn-primary-soft mb-0" onClick={clearFilters}>
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
}
