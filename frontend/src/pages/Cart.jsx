import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { showNotification } from '../utils/notification';

const Cart = () => {
  const { items, loading, error, total, updateQuantity, removeFromCart, fetchCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    await updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = async (itemId) => {
    await removeFromCart(itemId);
    showNotification('Item removed from cart', 'success');
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading cart...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="cart-page">
        <h1>Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Start shopping to add items to your cart</p>
            <Link to="/" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {items.map((item) => (
                <div key={item._id} className="cart-item">
                  <img 
                    src={item.product?.images?.[0]?.url || '/placeholder-image.jpg'} 
                    alt={item.product?.name}
                    className="cart-item-image"
                  />
                  
                  <div className="cart-item-details">
                    <h3>{item.product?.name}</h3>
                    <p className="cart-item-price">₹{item.price}</p>
                    <p className="cart-item-category">{item.product?.category}</p>
                  </div>
                  
                  <div className="cart-item-quantity">
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="cart-item-total">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-item">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="summary-item">
                <span>Shipping</span>
                <span>₹{total > 0 ? 50 : 0}</span>
              </div>
              <div className="summary-item total">
                <span>Total</span>
                <span>₹{(total + (total > 0 ? 50 : 0)).toFixed(2)}</span>
              </div>
              
              {user ? (
                <Link to="/checkout" className="btn-primary checkout-btn">
                  Proceed to Checkout
                </Link>
              ) : (
                <Link to="/login" className="btn-primary checkout-btn">
                  Login to Checkout
                </Link>
              )}
              
              <Link to="/" className="continue-shopping">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;