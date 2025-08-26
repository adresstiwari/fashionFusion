import React, { useState, useEffect } from 'react';
import { useProduct } from '../../context/ProductContext';
import ProductCard from '../../components/product/ProductCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
// import './CategoryPage.css';

const Men = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getProductsByCategory } = useProduct();

  useEffect(() => {
    const fetchMenProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching men products...');
        
        const response = await getProductsByCategory('men');
        console.log('Men products response:', response);
        
        if (response.success) {
          setProducts(response.data);
          console.log(`Found ${response.data.length} men's products`);
        } else {
          setError('Failed to load products');
        }
      } catch (err) {
        console.error('Error fetching men products:', err);
        setError('Error loading products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenProducts();
  }, [getProductsByCategory]);

  if (loading) {
    return (
      <div className="category-page">
        <div className="container">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-page">
        <div className="container">
          <div className="error-message">
            <h2>Error</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="category-page">
      <div className="container">
        <div className="category-header">
          <h1>Men's Collection</h1>
          <p className="category-description">
            Discover our latest men's fashion collection
          </p>
          <p className="product-count">
            {products.length} product{products.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {products.length === 0 ? (
          <div className="no-products">
            <h2>No products found</h2>
            <p>We couldn't find any products in the men's category.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Debug section - remove in production */}
        <div className="debug-section" style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
          <h3>Debug Information</h3>
          <p><strong>Category:</strong> men</p>
          <p><strong>Products found:</strong> {products.length}</p>
          <p><strong>Product categories:</strong> {Array.from(new Set(products.map(p => p.category))).join(', ')}</p>
          {products.length > 0 && (
            <div>
              <h4>Sample Product:</h4>
              <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                {JSON.stringify({
                  _id: products[0]._id,
                  name: products[0].name,
                  category: products[0].category,
                  price: products[0].price
                }, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Men;