import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const PaymentForm = ({ onSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => onSubmit({ ...data, paymentMethod }))} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Payment Method</h3>
        
        <div className="space-y-3">
          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-primary">
            <input
              type="radio"
              name="paymentMethod"
              value="credit_card"
              checked={paymentMethod === 'credit_card'}
              onChange={() => setPaymentMethod('credit_card')}
              className="text-primary focus:ring-primary"
            />
            <span className="ml-3">Credit Card</span>
          </label>

          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-primary">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={() => setPaymentMethod('paypal')}
              className="text-primary focus:ring-primary"
            />
            <span className="ml-3">PayPal</span>
          </label>

          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-primary">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
              className="text-primary focus:ring-primary"
            />
            <span className="ml-3">Cash on Delivery</span>
          </label>
        </div>
      </div>

      {paymentMethod === 'credit_card' && (
        <div className="space-y-4 p-4 border rounded-lg">
          <div>
            <label className="block text-sm font-medium mb-1">Card Number</label>
            <input
              {...register('cardNumber', {
                required: 'Card number is required',
                pattern: {
                  value: /^\d{16}$/,
                  message: 'Invalid card number'
                }
              })}
              placeholder="1234 5678 9012 3456"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Expiry Date</label>
              <input
                {...register('expiryDate', {
                  required: 'Expiry date is required',
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                    message: 'Invalid expiry date (MM/YY)'
                  }
                })}
                placeholder="MM/YY"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-sm mt-1">{errors.expiryDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">CVV</label>
              <input
                {...register('cvv', {
                  required: 'CVV is required',
                  pattern: {
                    value: /^\d{3,4}$/,
                    message: 'Invalid CVV'
                  }
                })}
                placeholder="123"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {errors.cvv && (
                <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cardholder Name</label>
            <input
              {...register('cardholderName', { required: 'Cardholder name is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {errors.cardholderName && (
              <p className="text-red-500 text-sm mt-1">{errors.cardholderName.message}</p>
            )}
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-secondary transition-colors"
      >
        Continue to Review
      </button>
    </form>
  );
};

export default PaymentForm;