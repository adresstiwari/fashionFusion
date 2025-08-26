import React, { useEffect, useState } from 'react';
import { useProduct } from '../../context/ProductContext';
import ProductGrid from '../../components/product/ProductGrid';
import ProductFilter from '../../components/product/ProductFilter';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Men = () => {
  const { products, loading, fetchProducts } = useProduct();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: 'men',
    priceRange: [0, 1000],
    sizes: [],
    colors: [],
    sort: 'newest'
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products by men's category and other filters
    let menProducts = products.filter(product => 
      product.category && product.category.toLowerCase() === 'men'
    );

    // Apply price filter
    menProducts = menProducts.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Apply size filter
    if (filters.sizes.length > 0) {
      menProducts = menProducts.filter(product =>
        product.sizes && product.sizes.some(size => filters.sizes.includes(size))
      );
    }

    // Apply color filter
    if (filters.colors.length > 0) {
      menProducts = menProducts.filter(product =>
        product.colors && product.colors.some(color => filters.colors.includes(color))
      );
    }

    // Apply sorting
    menProducts.sort((a, b) => {
      switch (filters.sort) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return (b.rating?.average || 0) - (a.rating?.average || 0);
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    setFilteredProducts(menProducts);
  }, [products, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'men',
      priceRange: [0, 1000],
      sizes: [],
      colors: [],
      sort: 'newest'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Men's Collection</h1>
        <p className="text-gray-600">{filteredProducts.length} products</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:block">
          <ProductFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} products
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
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Men;