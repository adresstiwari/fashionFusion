import React from 'react';
import { useCart } from '../context/CartContext';

const TestAddToCart = () => {
  const { addToCart } = useCart();

  const testProduct = {
    _id: "68ac8f84cf536abea48f8cb1", // Use the product ID from your console
    name: "test",
    price: 1018,
    images: [{
      url: "https://res.cloudinary.com/dtmmafhsh/image/upload/v1756139139/fashion-fusion/rjicfmqjrel06shq8pod.jpg",
      _id: "68ac8f84cf536abea48f8cb2"
    }],
    category: "men"
  };

  const handleTestAdd = async () => {
    try {
      console.log('Testing add to cart with product:', testProduct);
      await addToCart(testProduct, 1);
      console.log('Add to cart test completed');
    } catch (error) {
      console.error('Test add to cart error:', error);
    }
  };

  return (
    <div style={{ padding: '10px', background: '#f0f0f0', margin: '10px' }}>
      <h3>Test Add to Cart</h3>
      <button onClick={handleTestAdd} style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none' }}>
        Test Add Product to Cart
      </button>
      <p>Product: {testProduct.name} - ₹{testProduct.price}</p>
    </div>
  );
};

export default TestAddToCart;