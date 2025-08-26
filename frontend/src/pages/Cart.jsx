import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Cart = () => {
  const { items, loading, error } = useCart();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-red-500 text-xl mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="bg-primary text-white px-6 py-2 rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🛒</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Start shopping to add items to your cart</p>
          <Link
            to="/men"
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              {items.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>
          </div>
          
          <div>
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;