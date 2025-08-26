import React, { useEffect } from 'react';
import { useProduct } from '../../context/ProductContext';
import ProductGrid from '../../components/product/ProductGrid';
import ProductFilter from '../../components/product/ProductFilter';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Sale = () => {
  const { products, loading, filters, fetchProducts, setFilters } = useProduct();

  useEffect(() => {
    fetchProducts({ ...filters, onSale: true });
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters, page: 1 });
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      priceRange: [0, 200],
      sizes: [],
      colors: [],
      sort: 'newest',
      page: 1,
      limit: 12,
      onSale: true
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Sale Banner */}
      <div className="bg-accent text-white p-8 rounded-lg mb-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Summer Sale: Up to 50% Off!</h2>
        <p className="text-xl mb-6">Hurry, these deals won't last long. Limited time only.</p>
        
        <div className="flex justify-center space-x-4 mb-6">
          {['02', '18', '45', '12'].map((time, index) => (
            <div key={index} className="bg-white bg-opacity-20 rounded-lg p-3 text-center w-16">
              <span className="text-xl font-bold">{time}</span>
              <span className="block text-sm">{['Days', 'Hours', 'Mins', 'Secs'][index]}</span>
            </div>
          ))}
        </div>
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
              Showing {products.length} sale products
            </p>
            
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange({ sort: e.target.value })}
              className="border rounded px-3 py-2"
            >
              <option value="newest">Sort by: Newest</option>
              <option value="price-low">Sort by: Price Low to High</option>
              <option value="price-high">Sort by: Price High to Low</option>
              <option value="discount">Sort by: Discount</option>
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

export default Sale;