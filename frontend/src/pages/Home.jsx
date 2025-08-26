import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import ProductGrid from '../components/product/ProductGrid';
import Carousel from '../components/ui/Carousel';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Home = () => {
  const { products, loading, fetchProducts } = useProduct();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetchProducts({ limit: 8, sort: 'rating' });
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setFeaturedProducts(products.slice(0, 4));
    }
  }, [products]);

  const carouselItems = [
    <div key="1" className="relative h-96">
      <img
        src="/api/placeholder/1200/400"
        alt="Summer Collection"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Summer Collection 2023</h2>
          <p className="text-xl mb-6">Discover the latest trends in fashion</p>
          <Link
            to="/shop"
            className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-secondary transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>,
    <div key="2" className="relative h-96">
      <img
        src="/api/placeholder/1200/400"
        alt="New Arrivals"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">New Arrivals</h2>
          <p className="text-xl mb-6">Check out our latest products</p>
          <Link
            to="/shop?sort=newest"
            className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-secondary transition-colors"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>,
    <div key="3" className="relative h-96">
      <img
        src="/api/placeholder/1200/400"
        alt="Sale"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Summer Sale</h2>
          <p className="text-xl mb-6">Up to 50% off on selected items</p>
          <Link
            to="/sale"
            className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-secondary transition-colors"
          >
            View Sale
          </Link>
        </div>
      </div>
    </div>
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <Carousel items={carouselItems} autoPlay={true} interval={5000} />
      
      {/* Featured Categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/men" className="relative group overflow-hidden rounded-lg">
            <img
              src="/api/placeholder/400/300"
              alt="Men's Collection"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-white">Men</h3>
            </div>
          </Link>
          <Link to="/women" className="relative group overflow-hidden rounded-lg">
            <img
              src="/api/placeholder/400/300"
              alt="Women's Collection"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-white">Women</h3>
            </div>
          </Link>
          <Link to="/kids" className="relative group overflow-hidden rounded-lg">
            <img
              src="/api/placeholder/400/300"
              alt="Kids' Collection"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-white">Kids</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <ProductGrid products={featuredProducts} />
          )}
          <div className="text-center mt-8">
            <Link
              to="/shop"
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
            <p className="text-gray-600">We offer only the highest quality products from trusted brands.</p>
          </div>
          <div className="text-center">
            <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
            <p className="text-gray-600">Your payment information is protected with industry-standard encryption.</p>
          </div>
          <div className="text-center">
            <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Get your orders delivered quickly with our reliable shipping partners.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;