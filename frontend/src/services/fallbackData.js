// src/services/fallbackData.js
// This provides mock data when the backend is not available
export const mockProducts = [
  {
    _id: '1',
    name: 'Classic White T-Shirt',
    price: 29.99,
    originalPrice: 39.99,
    description: 'Premium quality cotton t-shirt for everyday wear',
    images: [{ url: 'https://via.placeholder.com/300x400?text=T-Shirt' }],
    category: 'men',
    rating: { average: 4.5, count: 120 },
    stock: 50,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Gray']
  },
  // Add more mock products as needed
];

export const mockUser = {
  _id: 'user1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user',
  createdAt: new Date().toISOString()
};