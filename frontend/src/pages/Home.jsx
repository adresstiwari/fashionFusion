import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import ProductGrid from '../components/product/ProductGrid';
import Carousel from '../components/ui/Carousel';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getCarouselImages } from '../utils/images';

const Home = () => {
  const { products, loading, fetchProducts } = useProduct();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const carouselItems = getCarouselImages();

  useEffect(() => {
    fetchProducts({ limit: 8, sort: 'rating' });
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setFeaturedProducts(products.slice(0, 4));
    }
  }, [products]);

  const carouselSlides = carouselItems.map(item => (
    <div key={item.id} className="relative h-96">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
          <p className="text-xl mb-6">{item.subtitle}</p>
          <Link
            to={item.link}
            className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-secondary transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="min-h-screen">
      <Carousel items={carouselSlides} autoPlay={true} interval={5000} />
      
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/men" className="relative group overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              alt="Men's Collection"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-white">Men</h3>
            </div>
          </Link>
          <Link to="/women" className="relative group overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              alt="Women's Collection"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-white">Women</h3>
            </div>
          </Link>
          <Link to="/kids" className="relative group overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1581338834647-b0fb40704e21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              alt="Kids' Collection"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-white">Kids</h3>
            </div>
          </Link>
        </div>
      </section>

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
              to="/men"
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

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
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose FashionFusion?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Authentic Products</h3>
              <p className="text-gray-600">100% genuine products with quality assurance</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Same-day delivery in select cities</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day easy return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">Subscribe to our newsletter for latest updates and offers</p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-primary text-white px-6 py-2 rounded-r-md hover:bg-secondary transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;