import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import ProductGrid from '../components/product/ProductGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';
import TestAddToCart from '../components/TestAddToCart';


const Home = () => {
  const { products, loading, fetchProducts } = useProduct();

  useEffect(() => {
    fetchProducts({ featured: true, limit: 8 });
  }, []);

  const categories = [
    {
      name: "Men's Fashion",
      image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      link: "/men"
    },
    {
      name: "Women's Fashion",
      image: "https://images.unsplash.com/photo-1536678891919-e0e7d61a4b15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      link: "/women"
    },
    {
      name: "Kids' Collection",
      image: "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      link: "/kids"
    },
    {
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      link: "/sale?category=accessories"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-96 bg-cover bg-center" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')`
      }}>
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Summer Collection 2023</h1>
            <p className="text-xl mb-8">Discover the latest trends in fashion and express your unique style with our exclusive collection.</p>
            <div className="flex justify-center space-x-4">
              <Link to="/men" className="bg-primary hover:bg-secondary px-6 py-3 rounded-full font-medium transition duration-300">
                Shop Men
              </Link>
              <Link to="/women" className="bg-primary hover:bg-secondary px-6 py-3 rounded-full font-medium transition duration-300">
                Shop Women
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Shop By Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.link}
              className="group bg-light rounded-lg overflow-hidden text-center p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="bg-gray-200 rounded-full p-4 w-24 h-24 mx-auto flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <div className="w-12 h-12 bg-cover bg-center rounded-full" style={{ backgroundImage: `url(${category.image})` }}></div>
              </div>
              <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
              <span className="text-primary text-sm font-medium">Explore</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link to="/men" className="text-primary font-medium hover:text-secondary">
            View All →
          </Link>
        </div>
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <ProductGrid products={products} />
        )}
      </section>

      {/* Sale Banner */}
      <section className="bg-primary text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Summer Sale</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Get up to 50% off on selected items. Hurry up before the offer ends!</p>
          
          <div className="flex justify-center space-x-4 mb-10">
            {['02', '18', '45', '12'].map((time, index) => (
              <div key={index} className="bg-white bg-opacity-20 rounded-lg p-4 text-center w-20">
                <span className="text-2xl font-bold">{time}</span>
                <span className="block text-sm">{['Days', 'Hours', 'Minutes', 'Seconds'][index]}</span>
              </div>
            ))}
          </div>
          
          <Link to="/sale" className="bg-white text-primary px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition duration-300">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Michael Chen",
              role: "Regular Customer",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
              text: "The quality of the clothes is exceptional. I've been shopping here for years and never been disappointed."
            },
            {
              name: "Sarah Johnson",
              role: "Fashion Blogger",
              image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80",
              text: "Their customer service is outstanding. They helped me choose the perfect outfit for my anniversary."
            },
            {
              name: "Jessica Williams",
              role: "New Customer",
              image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db1604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
              text: "Fast shipping and easy returns. The clothes fit perfectly and the fabric quality is much better than I expected."
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-light p-6 rounded-lg">
              <div className="flex text-yellow-400 mb-4">
                {"★".repeat(5)}
              </div>
              <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-cover bg-center py-16 text-white" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')`
      }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Get the latest updates on new products, special offers, and fashion tips.</p>
          
          <form className="max-w-xl mx-auto flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-secondary px-6 py-3 rounded-full font-medium transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;