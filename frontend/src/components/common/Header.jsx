import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Search, User, Heart, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              Fashion<span className="text-secondary">Fusion</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/men" className="text-neutral hover:text-primary font-medium">Men</Link>
            <Link to="/women" className="text-neutral hover:text-primary font-medium">Women</Link>
            <Link to="/kids" className="text-neutral hover:text-primary font-medium">Kids</Link>
            <Link to="/sale" className="text-neutral hover:text-primary font-medium">Sale</Link>
            {user?.role === 'admin' && (
              <div className="relative">
                <button
                  className="text-neutral hover:text-primary font-medium flex items-center"
                  onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
                >
                  Admin <ChevronDown size={16} className="ml-1" />
                </button>
                {isAdminMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10">
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsAdminMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/admin/products/add"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsAdminMenuOpen(false)}
                    >
                      Add Product
                    </Link>
                    <Link
                      to="/admin/products"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsAdminMenuOpen(false)}
                    >
                      All Products
                    </Link>
                    <Link
                      to="/admin/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsAdminMenuOpen(false)}
                    >
                      Orders
                    </Link>
                  </div>
                )}
              </div>
            )}
          </nav>
          
          {/* Search Bar */}
          <div className="hidden md:flex relative flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                <Search size={20} />
              </button>
            </form>
          </div>
          
          {/* Icons and User/Admin Menu */}
          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="text-gray-600 hover:text-primary transition-colors">
              <Heart size={24} />
            </Link>
            <Link to="/cart" className="relative text-gray-600 hover:text-primary transition-colors">
              <ShoppingCart size={24} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
            {user ? (
              <div className="relative">
                <button
                  className="flex items-center text-gray-600 hover:text-primary transition-colors"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <User size={24} />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-primary font-medium transition-colors hidden md:block">
                Login
              </Link>
            )}
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-primary md:hidden"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 flex flex-col space-y-3">
            <Link to="/men" className="text-neutral hover:text-primary font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>Men</Link>
            <Link to="/women" className="text-neutral hover:text-primary font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>Women</Link>
            <Link to="/kids" className="text-neutral hover:text-primary font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>Kids</Link>
            <Link to="/sale" className="text-neutral hover:text-primary font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>Sale</Link>
            
            {user?.role === 'admin' && (
              <>
                <div className="border-t border-gray-200 pt-2 mt-2"></div>
                <h4 className="text-sm font-semibold text-gray-500 px-2 py-1">Admin</h4>
                <Link to="/admin" className="text-neutral hover:text-primary font-medium py-2 px-2" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                <Link to="/admin/products/add" className="text-neutral hover:text-primary font-medium py-2 px-2" onClick={() => setIsMobileMenuOpen(false)}>Add Product</Link>
                <Link to="/admin/products" className="text-neutral hover:text-primary font-medium py-2 px-2" onClick={() => setIsMobileMenuOpen(false)}>All Products</Link>
                <Link to="/admin/orders" className="text-neutral hover:text-primary font-medium py-2 px-2" onClick={() => setIsMobileMenuOpen(false)}>Orders</Link>
              </>
            )}
            
            {!user && (
              <Link to="/login" className="text-neutral hover:text-primary font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
            )}
            
            {user && (
              <>
                <div className="border-t border-gray-200 pt-2 mt-2"></div>
                <h4 className="text-sm font-semibold text-gray-500 px-2 py-1">Account</h4>
                <Link to="/profile" className="text-neutral hover:text-primary font-medium py-2 px-2" onClick={() => setIsMobileMenuOpen(false)}>My Profile</Link>
                <Link to="/orders" className="text-neutral hover:text-primary font-medium py-2 px-2" onClick={() => setIsMobileMenuOpen(false)}>My Orders</Link>
                <button onClick={handleLogout} className="w-full text-left text-neutral hover:text-primary font-medium py-2 px-2">Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;