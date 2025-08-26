import React from 'react';
import { useCart } from '../../context/CartContext';

const OrderSummary = ({ items, shippingAddress, paymentMethod }) => {
  const { getCartTotal } = useCart();
  
  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? 5.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      
      <div className="space-y-4">
        {/* Order Items */}
        <div>
          <h4 className="font-medium mb-2">Items ({items.length})</h4>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item._id} className="flex justify-between">
                <div className="flex items-center">
                  <img
                    src={item.product.images[0]?.url || '/api/placeholder/40/40'}
                    alt={item.product.name}
                    className="w-10 h-10 object-cover rounded mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium">{item.product.name}</p>
                    <p className="text-xs text-gray-600">
                      Qty: {item.quantity}
                      {item.size && ` • Size: ${item.size}`}
                      {item.color && ` • Color: ${item.color}`}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-medium">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}
        {shippingAddress && (
          <div>
            <h4 className="font-medium mb-2">Shipping Address</h4>
            <p className="text-sm text-gray-600">
              {shippingAddress.firstName} {shippingAddress.lastName}<br />
              {shippingAddress.address}<br />
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}<br />
              {shippingAddress.phone}
            </p>
          </div>
        )}

        {/* Payment Method */}
        {paymentMethod && (
          <div>
            <h4 className="font-medium mb-2">Payment Method</h4>
            <p className="text-sm text-gray-600 capitalize">
              {paymentMethod.replace('_', ' ')}
            </p>
          </div>
        )}

        {/* Order Total */}
        <div className="border-t pt-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;