import React, { createContext, useReducer, useContext, useEffect } from 'react';
import cartService from '../services/cartService';
import { useAuth } from './AuthContext';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_CART':
      return { 
        ...state, 
        items: action.payload, 
        loading: false, 
        error: null 
      };
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.payload.itemId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        loading: false
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
        loading: false
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        loading: false
      };
    case 'SET_TOTALS':
      return {
        ...state,
        total: action.payload.total,
        itemCount: action.payload.itemCount
      };
    default:
      return state;
  }
};

const initialState = {
  items: [],
  loading: false,
  error: null,
  total: 0,
  itemCount: 0
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user } = useAuth();

  // Calculate totals whenever items change
  useEffect(() => {
    const total = state.items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    
    const itemCount = state.items.reduce((count, item) => {
      return count + item.quantity;
    }, 0);

    dispatch({ type: 'SET_TOTALS', payload: { total, itemCount } });
  }, [state.items]);

  // Fetch cart when user logs in
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      // For guest users, load cart from localStorage
      const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
      dispatch({ type: 'SET_CART', payload: guestCart });
    }
  }, [user]);

 
// UPDATE JUST THE fetchCart function in your existing CartContext.jsx
const fetchCart = async () => {
  try {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    
    console.log('Fetching cart for user:', user?.email);
    
    const cartItems = await cartService.getCart();
    console.log('Cart items received:', cartItems);
    
    dispatch({ type: 'SET_CART', payload: cartItems });
    
  } catch (error) {
    console.error('Error fetching cart:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    
    // Handle different error types appropriately
    if (error.response?.status === 404) {
      // Cart not found - this is normal for new users
      console.log('Cart not found, using empty cart');
      dispatch({ type: 'SET_CART', payload: [] });
    } 
    else if (error.response?.status === 401) {
      // User not authenticated
      console.log('User not authenticated, using empty cart');
      dispatch({ type: 'SET_CART', payload: [] });
    }
    else if (error.response?.status >= 500) {
      // Server errors - show notification
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Server error loading cart' 
      });
    }
    else {
      // Other errors - use empty cart but don't show error
      dispatch({ type: 'SET_CART', payload: [] });
    }
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};

// In your addToCart function, update the guest cart structure:
const addToCart = async (product, quantity = 1) => {
  try {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    if (!user) {
      // For guest users, store cart in localStorage
      const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
      const existingItemIndex = guestCart.findIndex(item => item.product._id === product._id);
      
      if (existingItemIndex > -1) {
        guestCart[existingItemIndex].quantity += quantity;
      } else {
        guestCart.push({
          _id: Date.now().toString(), // temporary ID for guest items
          product: { // Make sure product object has proper structure
            _id: product._id,
            name: product.name,
            price: product.price,
            images: product.images,
            category: product.category
          },
          quantity,
          price: product.price
        });
      }
      
      localStorage.setItem('guestCart', JSON.stringify(guestCart));
      dispatch({ type: 'SET_CART', payload: guestCart });
      return;
    }
    
    // For authenticated users
    const updatedCart = await cartService.addToCart(product._id, quantity);
    dispatch({ type: 'SET_CART', payload: updatedCart });
    
  } catch (error) {
    console.error('Error adding to cart:', error);
    dispatch({ 
      type: 'SET_ERROR', 
      payload: error.message || 'Failed to add item to cart' 
    });
  }
};

  const updateQuantity = async (itemId, quantity) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      if (!user) {
        // For guest users
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        const updatedCart = guestCart.map(item =>
          item._id === itemId ? { ...item, quantity } : item
        ).filter(item => item.quantity > 0);
        
        localStorage.setItem('guestCart', JSON.stringify(updatedCart));
        dispatch({ type: 'SET_CART', payload: updatedCart });
        return;
      }
      
      const updatedCart = await cartService.updateCartItem(itemId, quantity);
      dispatch({ type: 'SET_CART', payload: updatedCart });
      
    } catch (error) {
      console.error('Error updating cart:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Failed to update cart' 
      });
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      if (!user) {
        // For guest users
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        const updatedCart = guestCart.filter(item => item._id !== itemId);
        
        localStorage.setItem('guestCart', JSON.stringify(updatedCart));
        dispatch({ type: 'SET_CART', payload: updatedCart });
        return;
      }
      
      const updatedCart = await cartService.removeFromCart(itemId);
      dispatch({ type: 'SET_CART', payload: updatedCart });
      
    } catch (error) {
      console.error('Error removing from cart:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Failed to remove item from cart' 
      });
    }
  };

  const clearCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      if (!user) {
        localStorage.removeItem('guestCart');
        dispatch({ type: 'SET_CART', payload: [] });
        return;
      }
      
      await cartService.clearCart();
      dispatch({ type: 'SET_CART', payload: [] });
      
    } catch (error) {
      console.error('Error clearing cart:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Failed to clear cart' 
      });
    }
  };

  // Helper function to get cart count
  const getCartCount = () => {
    return state.itemCount;
  };

  // Helper function to get cart items
  const getCartItems = () => {
    return state.items;
  };

  // Helper function to get cart total
  const getCartTotal = () => {
    return state.total;
  };

  const value = {
    ...state,
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartCount,
    getCartItems,
    getCartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Export individual functions for direct import if needed
export const getCartCount = () => {
  const { itemCount } = useContext(CartContext);
  return itemCount;
};

export const getCartItems = () => {
  const { items } = useContext(CartContext);
  return items;
};

export const getCartTotal = () => {
  const { total } = useContext(CartContext);
  return total;
};