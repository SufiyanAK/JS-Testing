import security from '../lib/security';
import { trackPageView } from '../lib/analytics';
import { getExchangeRate } from '../lib/currency';
import { isValidEmail, sendEmail } from '../lib/email';
import { charge } from '../lib/payment';
import { getShippingQuote } from '../lib/shipping';

export const getPriceInCurrency = (price, currency) => {
  const rate = getExchangeRate('USD', currency);

  return price * rate;
};

// Exercise Mocking Modules
export const getShipInfo = (destination) => {
  const quote = getShippingQuote(destination);

  if (!quote) return 'Shipping Unavailable';

  return `Shipping Cost: $${quote.cost} (${quote.days} days)`;
};

// Integration Testing
export const renderPage = async () => {
  trackPageView('/home');

  return '<div>Home Page</div>';
};

// Exercise Integration Testing
export const submitOrder = async (order, creditCard) => {
  const paymentResult = await charge(creditCard, order.total);

  if (paymentResult.status === 'failed') {
    return {
      success: false,
      message: 'Payment failed',
    };
  }

  return {
    success: true,
    message: 'Order placed',
  };
};

// Parting Testing
export const signup = async (email) => {
  if (!isValidEmail(email)) return false;
  await sendEmail(email, 'Welcome to our platform');

  return true;
};

// Spying on Functions
export const login = async (email) => {
  const code = security.generateCode();

  await sendEmail(email, code.toString());
};

// Mocking Dates
export const isOnline = () => {
  const availableHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  const [open, close] = availableHours;
  const currentHour = new Date().getHours();

  return currentHour >= open && currentHour <= close;
};

// Mocking Dates Exercise
export const getDiscount = () => {
  const today = new Date();
  const isChristmasDay = today.getMonth() === 11 && today.getDate() === 25;

  return isChristmasDay ? 0.5 : 0;
};
