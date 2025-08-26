// Required field validation
export const required = (value) => {
  return value ? undefined : 'This field is required';
};

// Email validation
export const email = (value) => {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
    ? 'Invalid email address'
    : undefined;
};

// Minimum length validation
export const minLength = (min) => (value) => {
  return value && value.length < min
    ? `Must be at least ${min} characters`
    : undefined;
};

// Maximum length validation
export const maxLength = (max) => (value) => {
  return value && value.length > max
    ? `Must be no more than ${max} characters`
    : undefined;
};

// Number validation
export const number = (value) => {
  return value && isNaN(Number(value)) ? 'Must be a number' : undefined;
};

// Minimum value validation
export const minValue = (min) => (value) => {
  return value && value < min ? `Must be at least ${min}` : undefined;
};

// Maximum value validation
export const maxValue = (max) => (value) => {
  return value && value > max ? `Must be no more than ${max}` : undefined;
};

// Password confirmation validation
export const passwordsMatch = (value, allValues) => {
  return value !== allValues.password ? 'Passwords do not match' : undefined;
};

// Credit card number validation
export const creditCard = (value) => {
  return value && !/^\d{16}$/.test(value.replace(/\s/g, ''))
    ? 'Invalid credit card number'
    : undefined;
};

// Expiry date validation
export const expiryDate = (value) => {
  if (!value) return undefined;
  
  const [month, year] = value.split('/');
  if (!month || !year || month.length !== 2 || year.length !== 2) {
    return 'Invalid expiry date format (MM/YY)';
  }
  
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;
  
  const expMonth = parseInt(month, 10);
  const expYear = parseInt(year, 10);
  
  if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
    return 'Card has expired';
  }
  
  return undefined;
};

// CVV validation
export const cvv = (value) => {
  return value && !/^\d{3,4}$/.test(value) ? 'Invalid CVV' : undefined;
};

// Phone number validation
export const phoneNumber = (value) => {
  return value && !/^\+?[\d\s\-\(\)]{10,}$/.test(value)
    ? 'Invalid phone number'
    : undefined;
};

// ZIP code validation
export const zipCode = (value) => {
  return value && !/^\d{5}(-\d{4})?$/.test(value)
    ? 'Invalid ZIP code'
    : undefined;
};

// Compose multiple validators
export const composeValidators = (...validators) => (value) => {
  return validators.reduce((error, validator) => error || validator(value), undefined);
};