import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import AdminDropdown from '../Admin/AdminDropdown';
import UserProfileDropdown from '../User/UserProfileDropdown';
import './Header.css';

const Header = () => {
  const { user, isAuthenticated } = useAuth();
  const { getCartCount } = useCart(); // Now using the correct export

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            Fashion Fusion
          </Link>
          
          <nav className="nav">
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/men">Men</Link></li>
              <li><Link to="/women">Women</Link></li>
              <li><Link to="/kids">Kids</Link></li>
              <li><Link to="/sale">Sale</Link></li>
              <li><Link to="/size-guide">Size Guide</Link></li>
            </ul>
          </nav>

          <div className="header-actions">
            {isAuthenticated ? (
              <>
                {user?.role === 'admin' && <AdminDropdown />}
                <UserProfileDropdown user={user} />
                
                <Link to="/cart" className="cart-icon">
                  <span className="cart-icon-wrapper">
                    🛒
                    {getCartCount() > 0 && (
                      <span className="cart-badge">
                        {getCartCount()}
                      </span>
                    )}
                  </span>
                </Link>
                
                <Link to="/wishlist" className="wishlist-icon">
                  ♥
                </Link>
              </>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn-outline">Login</Link>
                <Link to="/register" className="btn-primary">Register</Link>
                
                <Link to="/cart" className="cart-icon">
                  <span className="cart-icon-wrapper">
                    🛒
                    {getCartCount() > 0 && (
                      <span className="cart-badge">
                        {getCartCount()}
                      </span>
                    )}
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;