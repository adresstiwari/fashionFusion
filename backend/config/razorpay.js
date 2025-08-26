const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create order
const createOrder = async (amount, currency = 'INR') => {
  try {
    const options = {
      amount: amount * 100,
      currency,
      receipt: crypto.randomBytes(10).toString('hex')
    };

    const response = await razorpay.orders.create(options);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating Razorpay order');
  }
};

// Verify payment
const verifyPayment = (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest('hex');
  
  return generated_signature === razorpay_signature;
};

module.exports = {
  razorpay,
  createOrder,
  verifyPayment
};