export const getProductImage = (imageUrl, width = 300, height = 400) => {
  if (imageUrl && imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  const sampleImages = [
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b',
    'https://images.unsplash.com/photo-1536678891919-e0e7d61a4b15',
    'https://images.unsplash.com/photo-1558769132-cb1aea458c5e',
    'https://images.unsplash.com/photo-1544441893-675973e31985',
    'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126',
  ];
  
  const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
  return `${randomImage}?ixlib=rb-1.2.1&auto=format&fit=crop&w=${width}&h=${height}&q=80`;
};

export const getCarouselImages = () => [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Summer Collection 2023',
    subtitle: 'Discover the latest trends in fashion',
    link: '/shop'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'New Arrivals',
    subtitle: 'Check out our latest products',
    link: '/shop?sort=newest'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Summer Sale',
    subtitle: 'Up to 50% off on selected items',
    link: '/sale'
  }
];