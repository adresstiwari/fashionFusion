import React from 'react';

const CheckoutSteps = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Shipping' },
    { number: 2, label: 'Payment' },
    { number: 3, label: 'Review' },
    { number: 4, label: 'Confirmation' }
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= step.number
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step.number}
            </div>
            
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-1 mx-2 ${
                  currentStep > step.number ? 'bg-primary' : 'bg-gray-200'
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-2">
        {steps.map((step) => (
          <span
            key={step.number}
            className={`text-sm ${
              currentStep >= step.number ? 'text-primary font-medium' : 'text-gray-600'
            }`}
          >
            {step.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CheckoutSteps;