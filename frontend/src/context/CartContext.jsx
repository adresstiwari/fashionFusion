import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { cartService } from '../services/cartService';
import { useNotification } from './NotificationContext';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.payload._id ? action.payload : item
        )
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    loading: true
  });
  const { addNotification } = useNotification();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const cartItems = await cartService.getCart();
      dispatch({ type: 'SET_CART', payload: cartItems });
    } catch (error) {
      console.error('Error fetching cart:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addToCart = async (productId, quantity = 1, size = '', color = '') => {
    try {
      const item = await cartService.addToCart(productId, quantity, size, color);
      
      // Check if item already exists in cart
      const existingItemIndex = state.items.findIndex(
        cartItem => cartItem.product._id === productId && 
                  cartItem.size === size && 
                  cartItem.color === color
      );

      if (existingItemIndex !== -1) {
        const updatedItem = {
          ...state.items[existingItemIndex],
          quantity: state.items[existingItemIndex].quantity + quantity
        };
        dispatch({ type: 'UPDATE_ITEM', payload: updatedItem });
      } else {
        dispatch({ type: 'ADD_ITEM', payload: item });
      }

      addNotification({
        type: 'success',
        message: 'Product added to cart!'
      });
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add to cart';
      
      addNotification({
        type: 'error',
        message: message
      });
      
      return { success: false, message };
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      if (quantity < 1) {
        await removeFromCart(itemId);
        return { success: true };
      }

      const updatedItem = await cartService.updateCartItem(itemId, quantity);
      dispatch({ type: 'UPDATE_ITEM', payload: updatedItem });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update quantity';
      
      addNotification({
        type: 'error',
        message: message
      });
      
      return { success: false, message };
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await cartService.removeFromCart(itemId);
      dispatch({ type: 'REMOVE_ITEM', payload: itemId });
      
      addNotification({
        type: 'success',
        message: 'Item removed from cart'
      });
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to remove item';
      
      addNotification({
        type: 'error',
        message: message
      });
      
      return { success: false, message };
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    items: state.items,
    loading: state.loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    refreshCart: fetchCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};