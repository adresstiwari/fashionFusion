import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const UserProfileDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <div className="user-dropdown" ref={dropdownRef}>
      <button 
        className="user-dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        👤 {user?.name}
      </button>
      
      {isOpen && (
        <div className="user-dropdown-menu">
          <Link to="/profile" className="dropdown-item" onClick={() => setIsOpen(false)}>
            Profile
          </Link>
          <Link to="/orders" className="dropdown-item" onClick={() => setIsOpen(false)}>
            My Orders
          </Link>
          <Link to="/addresses" className="dropdown-item" onClick={() => setIsOpen(false)}>
            Addresses
          </Link>
          <Link to="/wishlist" className="dropdown-item" onClick={() => setIsOpen(false)}>
            Wishlist
          </Link>
          <Link to="/change-password" className="dropdown-item" onClick={() => setIsOpen(false)}>
            Change Password
          </Link>
          <button onClick={handleLogout} className="dropdown-item logout">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;