import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/orderService';
import { paymentService } from '../services/paymentService';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import AddressForm from '../components/checkout/AddressForm';
import PaymentForm from '../components/checkout/PaymentForm';
import OrderSummary from '../components/checkout/OrderSummary';
import LoadingSpinner from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState({
    shippingAddress: null,
    paymentMethod: null
  });
  
  const { items, getCartTotal, clearCart } = useCart();

  const handleAddressSubmit = (data) => {
    setOrderData(prev => ({
      ...prev,
      shippingAddress: data
    }));
    setCurrentStep(2);
  };

  const handlePaymentSubmit = async (data) => {
    setLoading(true);
    try {
      setOrderData(prev => ({
        ...prev,
        paymentMethod: data.paymentMethod,
        paymentData: data
      }));

      // Create order
      const order = {
        items: items.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
          size: item.size,
          color: item.color
        })),
        shippingAddress: orderData.shippingAddress,
        paymentMethod: data.paymentMethod,
        itemsPrice: getCartTotal(),
        taxPrice: getCartTotal() * 0.08,
        shippingPrice: getCartTotal() > 50 ? 0 : 5.99,
        totalPrice: getCartTotal() + (getCartTotal() * 0.08) + (getCartTotal() > 50 ? 0 : 5.99)
      };

      const createdOrder = await orderService.createOrder(order);
      
      // Process payment based on method
      if (data.paymentMethod === 'credit_card') {
        // Process card payment
        const paymentResult = await paymentService.createPaymentIntent({
          orderId: createdOrder._id,
          amount: createdOrder.totalPrice
        });
        
        // For demo purposes, we'll just complete the order
        // In a real app, you would integrate with Stripe or other payment processor
        toast.success('Payment processed successfully!');
      }
      
      clearCart();
      window.location.href = `/order-confirmation/${createdOrder._id}`;
    } catch (error) {
      toast.error('Failed to process order');
      console.error('Order error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <CheckoutSteps currentStep={currentStep} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <AddressForm 
              onSubmit={handleAddressSubmit} 
              initialData={orderData.shippingAddress}
            />
          )}
          {currentStep === 2 && (
            <PaymentForm onSubmit={handlePaymentSubmit} />
          )}
        </div>
        
        <div>
          <OrderSummary 
            items={items}
            shippingAddress={orderData.shippingAddress}
            paymentMethod={orderData.paymentMethod}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;