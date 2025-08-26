import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService'; // Fixed import path
import { paymentService } from '../services/paymentService'; // Fixed import path
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import AddressForm from '../components/checkout/AddressForm';
import PaymentForm from '../components/checkout/PaymentForm';
import OrderSummary from '../components/checkout/OrderSummary';
import toast from 'react-hot-toast';

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleShippingSubmit = (address) => {
    setShippingAddress(address);
    setCurrentStep(2);
  };

  const handlePaymentSubmit = async (paymentData) => {
    setPaymentMethod(paymentData.paymentMethod);
    
    if (paymentData.paymentMethod === 'credit_card') {
      // For credit card payments, create Razorpay order
      try {
        setLoading(true);
        const amount = getCartTotal() + 5.99 + (getCartTotal() * 0.08);
        const razorpayOrder = await paymentService.createRazorpayOrder(amount);
        
        // Handle Razorpay payment
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: 'FashionFusion',
          description: 'Order Payment',
          order_id: razorpayOrder.id,
          handler: async function(response) {
            try {
              await paymentService.verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              });
              
              // Create order after successful payment
              await createOrder({
                paymentMethod: 'credit_card',
                paymentResult: response
              });
              
            } catch (error) {
              toast.error('Payment verification failed');
            }
          },
          prefill: {
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            contact: shippingAddress.phone
          },
          theme: {
            color: '#3B82F6'
          }
        };
        
        const razorpay = new window.Razorpay(options);
        razorpay.open();
        
      } catch (error) {
        toast.error('Failed to create payment order');
      } finally {
        setLoading(false);
      }
    } else {
      // For other payment methods, create order directly
      await createOrder({ paymentMethod: paymentData.paymentMethod });
    }
  };

  const createOrder = async (orderData) => {
    try {
      setLoading(true);
      const order = await orderService.createOrder({
        orderItems: items,
        shippingAddress,
        paymentMethod: orderData.paymentMethod,
        itemsPrice: getCartTotal(),
        shippingPrice: 5.99,
        taxPrice: getCartTotal() * 0.08,
        totalPrice: getCartTotal() + 5.99 + (getCartTotal() * 0.08),
        paymentResult: orderData.paymentResult
      });

      clearCart();
      navigate(`/order-confirmation/${order._id}`);
      
    } catch (error) {
      toast.error('Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <CheckoutSteps currentStep={currentStep} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                <AddressForm
                  onSubmit={handleShippingSubmit}
                  initialData={user.addresses?.[0]}
                />
              </div>
            )}
            
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                <PaymentForm onSubmit={handlePaymentSubmit} />
              </div>
            )}
          </div>
        </div>
        
        {/* Order Summary */}
        <div>
          <OrderSummary
            items={items}
            shippingAddress={shippingAddress}
            paymentMethod={paymentMethod}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;