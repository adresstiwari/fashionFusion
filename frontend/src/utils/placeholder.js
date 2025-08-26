// src/utils/placeholder.js
export const getPlaceholderImage = (width = 300, height = 300) => {
  return `https://via.placeholder.com/${width}x${height}?text=Fashion+Fusion`;
};

// Then update all image references to use this function
// Example in ProductCard.jsx:
// src={product.images[0]?.url || getPlaceholderImage(300, 400)}