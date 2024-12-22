import { getExchangeRate } from "../lib/currency";
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