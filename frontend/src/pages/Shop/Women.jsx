// src/pages/Shop/Women.jsx
import React, { useEffect } from 'react';
import { useProduct } from '../../context/ProductContext';
import ProductGrid from '../../components/product/ProductGrid';
import ProductFilter from '../../components/product/ProductFilter';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Women = () => {
  const { products, loading, filters, fetchProducts, setFilters } = useProduct();

  useEffect(() => {
    fetchProducts({ ...filters, category: 'women' });
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters, page: 1 });
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'women',
      priceRange: [0, 1000],
      sizes: [],
      colors: [],
      sort: 'newest',
      page: 1,
      limit: 12
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Women's Collection</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar with Filters */}
        <div className="lg:block">
          <ProductFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {products.length} products
            </p>
            
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange({ sort: e.target.value })}
              className="border rounded px-3 py-2"
            >
              <option value="newest">Sort by: Newest</option>
              <option value="price-low">Sort by: Price Low to High</option>
              <option value="price-high">Sort by: Price High to Low</option>
              <option value="name">Sort by: Name</option>
              <option value="rating">Sort by: Rating</option>
            </select>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Women;