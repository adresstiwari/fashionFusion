import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Star, Share, Truck, Shield, RotateCcw, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useProduct } from '../context/ProductContext';
import { getProductImage } from '../utils/images';
import { formatPrice } from '../utils/currency';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const { fetchProduct, product } = useProduct();

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        await fetchProduct(id);
      } catch (error) {
        console.error('Error loading product:', error);
        addNotification({ type: 'error', message: 'Failed to load product details' });
      } finally {
        setLoading(false);
      }
    };
    if (id) loadProduct();
  }, [id]);

  // Safe access to product images
  const images = product?.images?.length > 0 ? product.images : [{ url: getProductImage() }];

  const handleAddToCart = async () => {
    try {
      const result = await addToCart(product._id, quantity, selectedSize, selectedColor);
      if (result.success) addNotification({ type: 'success', message: 'Added to cart successfully!' });
    } catch {
      addNotification({ type: 'error', message: 'Failed to add to cart' });
    }
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      addNotification({ type: 'error', message: 'Please login to add to wishlist' });
      return;
    }
    try {
      // TODO: Integrate with backend wishlist service
      setIsWishlisted(!isWishlisted);
      addNotification({
        type: 'success',
        message: isWishlisted ? 'Removed from wishlist' : 'Added to wishlist'
      });
    } catch {
      addNotification({ type: 'error', message: 'Failed to update wishlist' });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name || 'Product',
          text: product?.description || '',
          url: window.location.href
        });
        addNotification({ type: 'success', message: 'Product shared successfully!' });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      addNotification({ type: 'success', message: 'Link copied to clipboard!' });
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <p className="text-gray-600">The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={images[selectedImage]?.url}
              alt={product?.name || 'Product'}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded border-2 ${
                  selectedImage === index ? 'border-primary' : 'border-gray-200'
                }`}
              >
                <img
                  src={image.url}
                  alt={`${product?.name || 'Product'} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product?.name || 'Product'}</h1>
            <div className="flex items-center mt-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(product?.rating?.average || 0) ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">({product?.rating?.count || 0} reviews)</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-primary">{formatPrice(product?.price || 0)}</span>
            {product?.originalPrice && (
              <>
                <span className="text-xl text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                <span className="bg-accent text-white px-2 py-1 rounded text-sm font-semibold">Save {discount}%</span>
              </>
            )}
          </div>

          <p className="text-gray-700 leading-relaxed">{product?.description || 'No description available'}</p>

          {/* Rest of the component remains unchanged */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
