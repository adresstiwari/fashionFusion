const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  addProduct,
  getAdminProducts,
  updateProduct,
  deleteProduct,
  getUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  getOrders,
  getOrderById,
  updateOrderStatus,
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

// Dashboard routes
router.route('/dashboard').get(protect, admin, getDashboardStats);

// Product routes
router.route('/products').get(protect, admin, getAdminProducts).post(protect, admin, addProduct);
router.route('/products/:id').put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);

// User routes
router.route('/users').get(protect, admin, getUsers);
router.route('/users/:id').get(protect, admin, getUserById).put(protect, admin, updateUserRole).delete(protect, admin, deleteUser);

// Order routes
router.route('/orders').get(protect, admin, getOrders);
router.route('/orders/:id').get(protect, admin, getOrderById).put(protect, admin, updateOrderStatus);

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const {
//   getDashboardStats,
//   addProduct,
//   // Other imports for existing functions
// } = require('../controllers/adminController');
// const { protect, admin } = require('../middleware/auth');

// router.route('/').get(protect, admin, getDashboardStats);
// router.route('/products').post(protect, admin, addProduct); // New route

// // Other existing admin routes...
// module.exports = router;