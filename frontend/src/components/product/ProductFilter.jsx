import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';

const ProductFilter = ({ filters = {}, onFilterChange, onClearFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Ensure filters object has all required properties with defaults
  const safeFilters = {
    categories: filters?.categories || [],   // updated for multiple categories
    priceRange: filters?.priceRange || [0, 1000],
    sizes: filters?.sizes || [],
    colors: filters?.colors || [],
    sort: filters?.sort || 'newest',
    ...filters
  };

  const categories = [
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
    { value: 'kids', label: 'Kids' },
    { value: 'accessories', label: 'Accessories' }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple'];
  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name' },
    { value: 'rating', label: 'Rating' }
  ];

  // --- Updated category change logic for multiple selections ---
  const handleCategoryChange = (category) => {
    let newCategories;
    if (safeFilters.categories.includes(category)) {
      newCategories = safeFilters.categories.filter(c => c !== category);
    } else {
      newCategories = [...safeFilters.categories, category];
    }
    onFilterChange?.({ categories: newCategories });
  };

  const handleSizeChange = (size) => {
    const newSizes = safeFilters.sizes.includes(size)
      ? safeFilters.sizes.filter(s => s !== size)
      : [...safeFilters.sizes, size];
    onFilterChange?.({ sizes: newSizes });
  };

  const handleColorChange = (color) => {
    const newColors = safeFilters.colors.includes(color)
      ? safeFilters.colors.filter(c => c !== color)
      : [...safeFilters.colors, color];
    onFilterChange?.({ colors: newColors });
  };

  const handlePriceChange = (min, max) => {
    onFilterChange?.({ priceRange: [min, max] });
  };

  const handleSortChange = (sort) => {
    onFilterChange?.({ sort });
  };

  const hasActiveFilters = safeFilters.categories.length > 0 || 
                          safeFilters.sizes.length > 0 || 
                          safeFilters.colors.length > 0 || 
                          safeFilters.priceRange[0] > 0 || 
                          safeFilters.priceRange[1] < 1000;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Mobile Filter Toggle */}
      <button
        className="md:hidden flex items-center justify-between w-full mb-4 p-3 bg-gray-50 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">Filters</span>
        <Filter size={20} />
      </button>

      {/* Filter Content */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block space-y-6`}>
        {/* Category Filter */}
        <div>
          <h4 className="font-medium mb-3">Category</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={safeFilters.categories.includes(category.value)}
                  onChange={() => handleCategoryChange(category.value)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="ml-2 text-sm">{category.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div>
          <h4 className="font-medium mb-3">Price Range</h4>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="1000"
              value={safeFilters.priceRange[1]}
              onChange={(e) => handlePriceChange(safeFilters.priceRange[0], parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${safeFilters.priceRange[0]}</span>
              <span>${safeFilters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Size Filter */}
        <div>
          <h4 className="font-medium mb-3">Size</h4>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`px-3 py-1 rounded border text-sm transition-colors ${
                  safeFilters.sizes.includes(size)
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 hover:border-primary'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Filter */}
        <div>
          <h4 className="font-medium mb-3">Color</h4>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className={`px-3 py-1 rounded border text-sm transition-colors ${
                  safeFilters.colors.includes(color)
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 hover:border-primary'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <h4 className="font-medium mb-3">Sort By</h4>
          <select
            value={safeFilters.sort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-primary focus:border-primary"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="w-full py-2 text-sm text-gray-600 hover:text-primary flex items-center justify-center"
          >
            <X size={16} className="mr-1" />
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductFilter;
