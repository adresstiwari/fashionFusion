const { createOrder, verifyPayment } = require('../config/razorpay');
const Order = require('../models/Order');

// Create Razorpay order
const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;
    
    const order = await createOrder(amount, currency);
    
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating payment order' });
  }
};

// Verify payment
const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = req.body;
    
    const isValid = verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);
    
    if (isValid) {
      // Update order payment status
      const order = await Order.findById(order_id);
      
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          status: 'completed'
        };
        
        await order.save();
        
        res.json({ success: true, message: 'Payment verified successfully' });
      } else {
        res.status(404).json({ success: false, message: 'Order not found' });
      }
    } else {
      res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error verifying payment' });
  }
};

module.exports = {
  createRazorpayOrder,
  verifyRazorpayPayment
};