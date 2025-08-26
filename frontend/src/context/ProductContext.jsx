import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { showNotification } from '../utils/notification';
import { debounce } from '../utils/debounce.js';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 10000],
    sortBy: 'newest',
    searchQuery: ''
  });

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching all products...');
      
      const response = await api.get('/products');
      
      if (response.data.success) {
        setProducts(response.data.data);
        setFilteredProducts(response.data.data);
        console.log(`Fetched ${response.data.data.length} products`);
        return response.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.response?.data?.message || 'Failed to load products');
      showNotification('Failed to load products', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get products by category
  const getProductsByCategory = async (category) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`Fetching products for category: ${category}`);
      
      const response = await api.get(`/products/category/${category}`);
      
      console.log(`API response for ${category}:`, response.data);
      
      if (response.data.success) {
        setFilteredProducts(response.data.data);
        return response.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch products');
      }
    } catch (error) {
      console.error(`Error fetching ${category} products:`, error);
      setError(error.response?.data?.message || 'Failed to load products');
      showNotification(`Failed to load ${category} products`, 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Search products
  const searchProducts = async (query) => {
  try {
    // Skip empty queries
    if (!query.trim()) {
      setFilteredProducts(products);
      return { success: true, data: products };
    }
    
    setLoading(true);
    setError(null);
    
    console.log(`Searching products for: ${query}`);
    
    const response = await api.get(`/products/search?q=${encodeURIComponent(query)}`);
    
    if (response.data.success) {
      setFilteredProducts(response.data.data);
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to search products');
    }
  } catch (error) {
    // Don't show error for empty results or cancelled requests
    if (error.response?.status !== 404 && !axios.isCancel(error)) {
      console.error('Error searching products:', error);
      setError(error.response?.data?.message || 'Failed to search products');
      showNotification('Failed to search products', 'error');
    }
    throw error;
  } finally {
    setLoading(false);
  }
};

const debouncedSearch = debounce((query) => {
  searchProducts(query);
}, 300);
  // Get single product by ID
  const getProductById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`Fetching product with ID: ${id}`);
      
      const response = await api.get(`/products/${id}`);
      
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch product');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setError(error.response?.data?.message || 'Failed to load product');
      showNotification('Failed to load product details', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Filter products locally
  const filterProducts = (newFilters) => {
    try {
      setLoading(true);
      
      const updatedFilters = { ...filters, ...newFilters };
      setFilters(updatedFilters);
      
      let filtered = [...products];
      
      // Apply category filter
      if (updatedFilters.category && updatedFilters.category !== 'all') {
        filtered = filtered.filter(product => 
          product.category?.toLowerCase() === updatedFilters.category.toLowerCase()
        );
      }
      
      // Apply price range filter
      filtered = filtered.filter(product => 
        product.price >= updatedFilters.priceRange[0] && 
        product.price <= updatedFilters.priceRange[1]
      );
      
      // Apply search filter
      if (updatedFilters.searchQuery) {
        const query = updatedFilters.searchQuery.toLowerCase();
        filtered = filtered.filter(product =>
          product.name?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query) ||
          product.brand?.toLowerCase().includes(query)
        );
      }
      
      // Apply sorting
      switch (updatedFilters.sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'rating':
          filtered.sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0));
          break;
        default:
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
      
      setFilteredProducts(filtered);
      console.log(`Filtered products: ${filtered.length} items`);
      
    } catch (error) {
      console.error('Error filtering products:', error);
      setError('Failed to filter products');
    } finally {
      setLoading(false);
    }
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: [0, 10000],
      sortBy: 'newest',
      searchQuery: ''
    });
    setFilteredProducts(products);
  };

  // Get featured products
  const getFeaturedProducts = async () => {
    try {
      setLoading(true);
      
      // First try to get featured products from API if you have that endpoint
      try {
        const response = await api.get('/products?featured=true');
        if (response.data.success) {
          return response.data.data;
        }
      } catch (error) {
        console.log('No featured endpoint, filtering locally');
      }
      
      // Fallback: filter locally for featured products
      const featured = products.filter(product => product.featured);
      return featured.length > 0 ? featured : products.slice(0, 8); // Fallback to first 8 products
      
    } catch (error) {
      console.error('Error getting featured products:', error);
      return products.slice(0, 8); // Fallback to first 8 products
    } finally {
      setLoading(false);
    }
  };

  // Get products on sale
  const getSaleProducts = async () => {
    try {
      // Try to get sale products from API
      try {
        const response = await api.get('/products?onSale=true');
        if (response.data.success) {
          return response.data.data;
        }
      } catch (error) {
        console.log('No sale endpoint, filtering locally');
      }
      
      // Fallback: filter locally for sale products
      return products.filter(product => product.onSale || product.discount > 0);
      
    } catch (error) {
      console.error('Error getting sale products:', error);
      return [];
    }
  };

  // Get unique categories
  const getUniqueCategories = () => {
    const categories = products
      .map(product => product.category)
      .filter(Boolean)
      .filter((category, index, self) => self.indexOf(category) === index);
    
    return categories.sort();
  };

  // Get products by brand
  const getProductsByBrand = async (brand) => {
    try {
      setLoading(true);
      
      const filtered = products.filter(product => 
        product.brand?.toLowerCase() === brand.toLowerCase()
      );
      
      setFilteredProducts(filtered);
      return filtered;
      
    } catch (error) {
      console.error('Error filtering by brand:', error);
      setError('Failed to filter by brand');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    // State
    products,
    filteredProducts,
    loading,
    error,
    filters,
    
    // Functions
    fetchProducts,
    getProductsByCategory,
    searchProducts,
    getProductById,
    filterProducts,
    clearFilters,
    getFeaturedProducts,
    getSaleProducts,
    getUniqueCategories,
    getProductsByBrand,
    
    // Utility functions
    getProductCount: () => filteredProducts.length,
    getTotalProducts: () => products.length,
    hasProducts: () => filteredProducts.length > 0
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};

export default ProductContext;