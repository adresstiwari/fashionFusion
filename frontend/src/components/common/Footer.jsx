import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Fashion<span className="text-primary">Fusion</span></h3>
            <p className="text-gray-400 mb-4">Providing quality fashion products for everyone since 2010.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/men" className="text-gray-400 hover:text-primary transition-colors">Men's Collection</Link></li>
              <li><Link to="/women" className="text-gray-400 hover:text-primary transition-colors">Women's Collection</Link></li>
              <li><Link to="/kids" className="text-gray-400 hover:text-primary transition-colors">Kids' Collection</Link></li>
              <li><Link to="/sale" className="text-gray-400 hover:text-primary transition-colors">Sale</Link></li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-primary transition-colors">FAQs</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-gray-400">123 Fashion Street, New York, NY 10001</span>
              </li>
              <li className="flex items-center">
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <span className="text-gray-400">info@fashionfusion.com</span>
              </li>
              <li className="flex items-center">
                <span className="text-gray-400">Mon-Fri: 9AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2023 FashionFusion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;