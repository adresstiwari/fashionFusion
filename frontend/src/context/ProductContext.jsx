import React, { createContext, useContext, useReducer } from 'react';
import { productService } from '../services/productService';

const ProductContext = createContext();

const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload.products,
        totalProducts: action.payload.total,
        loading: false
      };
    case 'SET_PRODUCT':
      return {
        ...state,
        product: action.payload,
        loading: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
    case 'CLEAR_FILTERS':
      return {
        ...state,
        filters: {
          category: '',
          priceRange: [0, 1000],
          sizes: [],
          colors: [],
          sort: 'newest',
          page: 1,
          limit: 12
        }
      };
    default:
      return state;
  }
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, {
    products: [],
    product: null,
    totalProducts: 0,
    loading: true,
    filters: {
      category: '',
      priceRange: [0, 1000],
      sizes: [],
      colors: [],
      sort: 'newest',
      page: 1,
      limit: 12
    }
  });

  const fetchProducts = async (filters = {}) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          if (Array.isArray(value)) {
            value.forEach(v => queryParams.append(key, v));
          } else {
            queryParams.append(key, value);
          }
        }
      });

      const response = await productService.getProducts(queryParams.toString());
      dispatch({
        type: 'SET_PRODUCTS',
        payload: {
          products: response.data,
          total: response.total
        }
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const fetchProduct = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const product = await productService.getProduct(id);
      dispatch({ type: 'SET_PRODUCT', payload: product });
    } catch (error) {
      console.error('Error fetching product:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const searchProducts = async (query) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await productService.searchProducts(query);
      dispatch({
        type: 'SET_PRODUCTS',
        payload: {
          products: response.data,
          total: response.count
        }
      });
    } catch (error) {
      console.error('Error searching products:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const setFilters = (filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  const value = {
    products: state.products,
    product: state.product,
    totalProducts: state.totalProducts,
    loading: state.loading,
    filters: state.filters,
    fetchProducts,
    fetchProduct,
    searchProducts,
    setFilters,
    clearFilters
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};