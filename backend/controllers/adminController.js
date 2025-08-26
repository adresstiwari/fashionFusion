const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');
const cloudinary = require('../config/cloudinary');

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalRevenueResult = await Order.aggregate([
    { $match: { isPaid: true } },
    { $group: { _id: null, total: { $sum: '$totalPrice' } } }
  ]);
  const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].total : 0;
  
  res.json({
    totalUsers,
    totalProducts,
    totalOrders,
    totalRevenue
  });
});

// @desc    Add a product
// @route   POST /api/admin/products
// @access  Private/Admin
const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock, images, sizes, colors } = req.body;
  
  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock,
    images,
    sizes,
    colors,
    user: req.user._id,
  });

  res.status(201).json(product);
});

// @desc    Update a product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock, images, sizes, colors } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock;
    product.images = images || product.images;
    product.sizes = sizes || product.sizes;
    product.colors = colors || product.colors;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    // Delete images from Cloudinary
    for (const image of product.images) {
      if (image.publicId) {
        await cloudinary.uploader.destroy(image.publicId);
      }
    }
    
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get all products for admin
// @route   GET /api/admin/products
// @access  Private/Admin
const getAdminProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});

// @desc    Get single user
// @route   GET /api/admin/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
const updateUserRole = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.role = req.body.role || user.role;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'name email');
  res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/admin/orders/:id
// @access  Private/Admin
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email').populate('orderItems.product', 'name price');
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, trackingNumber, carrier } = req.body;
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = status || order.status;
    order.trackingNumber = trackingNumber || order.trackingNumber;
    order.carrier = carrier || order.carrier;
    
    if (status === 'Delivered' && !order.deliveredAt) {
      order.deliveredAt = Date.now();
    }
    
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

module.exports = {
  getDashboardStats,
  addProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
  getUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  getOrders,
  getOrderById,
  updateOrderStatus
};
// const asyncHandler = require('express-async-handler');
// const Product = require('../models/Product');
// const User = require('../models/User');
// const Order = require('../models/Order');

// // @desc    Add a new product
// // @route   POST /api/admin/products
// // @access  Private/Admin
// const addProduct = asyncHandler(async (req, res) => {
//   const { name, description, category, price, originalPrice, stock, images, sizes, colors } = req.body;

//   if (!name || !description || !category || !price || !stock || !images) {
//     res.status(400);
//     throw new Error('Please fill all required fields');
//   }

//   const product = await Product.create({
//     name,
//     description,
//     category,
//     price,
//     originalPrice,
//     stock,
//     images,
//     sizes,
//     colors,
//     user: req.user._id,
//   });

//   res.status(201).json(product);
// });

// // Other existing admin controller functions...
// const getDashboardStats = asyncHandler(async (req, res) => {
//   const totalUsers = await User.countDocuments();
//   const totalProducts = await Product.countDocuments();
//   const totalOrders = await Order.countDocuments();
  
//   const totalRevenueResult = await Order.aggregate([
//     { $match: { isPaid: true } },
//     { $group: { _id: null, total: { $sum: '$totalPrice' } } }
//   ]);
//   const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].total : 0;
  
//   const monthlyRevenue = await Order.aggregate([
//     { $match: { isPaid: true } },
//     {
//       $group: {
//         _id: {
//           year: { $year: '$createdAt' },
//           month: { $month: '$createdAt' }
//         },
//         revenue: { $sum: '$totalPrice' }
//       }
//     },
//     { $sort: { '_id.year': 1, '_id.month': 1 } },
//     { $limit: 6 }
//   ]);
  
//   const categoryStats = await Product.aggregate([
//     {
//       $group: {
//         _id: '$category',
//         count: { $sum: 1 }
//       }
//     }
//   ]);

//   res.json({ totalUsers, totalProducts, totalOrders, totalRevenue, monthlyRevenue, categoryStats });
// });

// // ... and so on for other admin functions
// module.exports = { addProduct, getDashboardStats };