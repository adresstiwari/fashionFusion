import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';
import Home from './pages/Home';
import Men from './pages/Shop/Men';
import Women from './pages/Shop/Women';
import Kids from './pages/Shop/Kids';
import Sale from './pages/Shop/Sale';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import Profile from './pages/User/Profile';
import Orders from './pages/User/Orders';
import Addresses from './pages/User/Addresses';
import Wishlist from './pages/User/Wishlist';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import SizeGuide from './pages/SizeGuide';
import ChangePassword from './pages/User/ChangePassword';
import AdminDashboard from './pages/admin/Dashboard';
import ProductList from './pages/admin/Products/ProductList';
import AddProduct from './pages/admin/Products/AddProduct';
import EditProduct from './pages/admin/Products/EditProduct';
import OrderList from './pages/admin/Orders/OrderList';
import OrderDetails from './pages/admin/Orders/OrderDetails';
import UserList from './pages/admin/Users/UserList';
import UserDetails from './pages/admin/Users/UserDetails';
import CategoryList from './pages/admin/Categories/CategoryList';
import AddCategory from './pages/admin/Categories/AddCategory';
import SalesReport from './pages/admin/Analytics/SalesReport';
import Notification from './components/common/Notification';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <Router>
            <div className="min-h-screen bg-light flex flex-col">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/men" element={<Men />} />
                  <Route path="/women" element={<Women />} />
                  <Route path="/kids" element={<Kids />} />
                  <Route path="/sale" element={<Sale />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgotpassword" element={<ForgotPassword />} />
                  <Route path="/resetpassword/:token" element={<ResetPassword />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/size-guide" element={<SizeGuide />} />
                  
                  {/* Protected User Routes */}
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  <Route path="/orders" element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  } />
                  <Route path="/addresses" element={
                    <ProtectedRoute>
                      <Addresses />
                    </ProtectedRoute>
                  } />
                  <Route path="/wishlist" element={
                    <ProtectedRoute>
                      <Wishlist />
                    </ProtectedRoute>
                  } />
                  <Route path="/change-password" element={
                    <ProtectedRoute>
                      <ChangePassword />
                    </ProtectedRoute>
                  } />
                  
                  {/* Protected Admin Routes */}
                  <Route path="/admin" element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  } />
                  <Route path="/admin/products" element={
                    <AdminRoute>
                      <ProductList />
                    </AdminRoute>
                  } />
                  <Route path="/admin/products/add" element={
                    <AdminRoute>
                      <AddProduct />
                    </AdminRoute>
                  } />
                  <Route path="/admin/products/edit/:id" element={
                    <AdminRoute>
                      <EditProduct />
                    </AdminRoute>
                  } />
                  <Route path="/admin/orders" element={
                    <AdminRoute>
                      <OrderList />
                    </AdminRoute>
                  } />
                  <Route path="/admin/orders/:id" element={
                    <AdminRoute>
                      <OrderDetails />
                    </AdminRoute>
                  } />
                  <Route path="/admin/users" element={
                    <AdminRoute>
                      <UserList />
                    </AdminRoute>
                  } />
                  <Route path="/admin/users/:id" element={
                    <AdminRoute>
                      <UserDetails />
                    </AdminRoute>
                  } />
                  <Route path="/admin/categories" element={
                    <AdminRoute>
                      <CategoryList />
                    </AdminRoute>
                  } />
                  <Route path="/admin/categories/add" element={
                    <AdminRoute>
                      <AddCategory />
                    </AdminRoute>
                  } />
                  <Route path="/admin/analytics" element={
                    <AdminRoute>
                      <SalesReport />
                    </AdminRoute>
                  } />
                  
                  {/* 404 Page */}
                  <Route path="*" element={
                    <div className="container">
                      <div className="not-found">
                        <h1>404 - Page Not Found</h1>
                        <p>The page you're looking for doesn't exist.</p>
                        <a href="/" className="btn-primary">Go Home</a>
                      </div>
                    </div>
                  } />
                </Routes>
              </main>
              <Footer />
              <Notification />
            </div>
          </Router>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;