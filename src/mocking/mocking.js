import security from "../lib/security";
import { trackPageView } from "../lib/analytics";
import { getExchangeRate } from "../lib/currency";
import { isValidEmail, sendEmail } from "../lib/email";
import { charge } from "../lib/payment";
import { getShippingQuote } from "../lib/shipping";

export const getPriceInCurrency = (price, currency) => {
    const rate = getExchangeRate('USD', currency);

    return price * rate;
}

// Exercise Mocking Modules
export const getShipInfo = (destination) => {
    const quote = getShippingQuote(destination);

    if (!quote) return 'Shipping Unavailable'

    return `Shipping Cost: $${quote.cost} (${quote.days} days)`;
}

// Integration Testing
export const renderPage = async () => {
    trackPageView('/home');

    return '<div>Home Page</div>';
}

// Exercise Integration Testing
export const submitOrder = async (order, creditCard) => {
    const paymentResult = await charge(creditCard, order.total);

    if (paymentResult.status === 'failed') {
        return {
            success: false,
            message: 'Payment failed'
        }
    }

    return {
        success: true,
        message: 'Order placed'
    }
}

// Parting Testing
export const signup = async (email) => {
    if (!isValidEmail(email)) return false;
    await sendEmail(email, 'Welcome to our platform');

    return true;
}

// Spying on Functions
export const login = async (email) => {
    const code = security.generateCode();

    await sendEmail(email, code.toString());
}
