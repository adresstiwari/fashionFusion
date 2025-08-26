import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    
    setQuantity(newQuantity);
    await updateQuantity(item._id, newQuantity);
  };

  const handleRemove = async () => {
    await removeFromCart(item._id);
  };

  return (
    <div className="flex items-center p-4 border-b">
      <Link to={`/product/${item.product._id}`} className="flex-shrink-0">
        <img
          src={item.product.images[0]?.url || '/api/placeholder/80/80'}
          alt={item.product.name}
          className="w-20 h-20 object-cover rounded"
        />
      </Link>

      <div className="ml-4 flex-1">
        <Link to={`/product/${item.product._id}`} className="block">
          <h3 className="font-medium text-gray-900 hover:text-primary transition-colors">
            {item.product.name}
          </h3>
        </Link>
        
        {item.size && (
          <p className="text-sm text-gray-600 mt-1">Size: {item.size}</p>
        )}
        {item.color && (
          <p className="text-sm text-gray-600">Color: {item.color}</p>
        )}
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </button>
            
            <span className="w-8 text-center font-medium">{quantity}</span>
            
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <span className="font-semibold text-primary">
              ${(item.product.price * quantity).toFixed(2)}
            </span>
            
            <button
              onClick={handleRemove}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;