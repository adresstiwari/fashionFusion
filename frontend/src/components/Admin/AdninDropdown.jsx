import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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

  const handleItemClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="admin-dropdown" ref={dropdownRef}>
      <button 
        className="admin-dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        Admin Panel
      </button>
      
      {isOpen && (
        <div className="admin-dropdown-menu">
          <div className="admin-dropdown-item" onClick={() => handleItemClick('/admin')}>
            Dashboard
          </div>
          <div className="admin-dropdown-item" onClick={() => handleItemClick('/admin/products')}>
            Product Management
          </div>
          <div className="admin-dropdown-item" onClick={() => handleItemClick('/admin/users')}>
            User Management
          </div>
          <div className="admin-dropdown-item" onClick={() => handleItemClick('/admin/orders')}>
            Order Management
          </div>
          <div className="admin-dropdown-item" onClick={() => handleItemClick('/admin/categories')}>
            Category Management
          </div>
          <div className="admin-dropdown-item" onClick={() => handleItemClick('/admin/analytics')}>
            Analytics & Reports
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDropdown;