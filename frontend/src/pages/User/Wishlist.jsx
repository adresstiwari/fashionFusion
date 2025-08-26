import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService'; // Fixed import path
import { useAuth } from '../../context/AuthContext';
import ProductGrid from '../../components/product/ProductGrid';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Heart } from 'lucide-react';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const wishlistData = await userService.getWishlist();
        setWishlist(wishlistData);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchWishlist();
    }
  }, [user]);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await userService.removeFromWishlist(productId);
      setWishlist(wishlist.filter(item => item._id !== productId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <Heart size={64} className="mx-auto text-gray-400 mb-6" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500">Save your favorite items here for later</p>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {wishlist.length} items in wishlist
            </p>
          </div>
          
          <ProductGrid products={wishlist} />
        </div>
      )}
    </div>
  );
};

export default Wishlist;