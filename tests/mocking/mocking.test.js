import { vi, it, expect, describe } from 'vitest'
import { getExchangeRate } from '../../src/lib/currency';
import { getPriceInCurrency, getShipInfo, renderPage, submitOrder } from '../../src/mocking/mocking';
import { getShippingQuote } from '../../src/lib/shipping';
import { trackPageView } from '../../src/lib/analytics';
import { charge } from '../../src/lib/payment';

vi.mock('../../src/lib/currency');
vi.mock('../../src/lib/shipping');
vi.mock('../../src/lib/analytics');
vi.mock('../../src/lib/payment');

describe('test suite', () => {
    it('test case', () => {
        const greet = vi.fn()

        // mockReturnValue
        // greet.mockReturnValue('Hello World')

        // mockResolvedValue
        // greet.mockResolvedValue('Hello World')

        // mockImplementation
        greet.mockImplementation(name => 'Hello World of ' + name)

        const result = greet('Sufiyan')

        // expect(greet).toHaveBeenCalled()
        // expect(greet).toHaveBeenCalledWith('Sufiyan')
        expect(greet).toHaveBeenCalledOnce(1)
        console.log(result)
    })
})

describe('Mock Function Exercise', () => {
    it('Mock Function', () => {
        const sendText = vi.fn();

        sendText.mockImplementation((text) => {
            return text;
        });

        const result = sendText('Hello World');

        expect(sendText).toHaveBeenCalledWith('Hello World');

        expect(result).toBe('Hello World');
    })
})

// Mocking Modules
describe('get Price In Currency', () => {
    it('should return price in target currency', () => {
        vi.mocked(getExchangeRate).mockReturnValue(1.5);

        const price = getPriceInCurrency(100, 'AUD');

        expect(price).toBe(150);
    })
})

// Mocking Modules Exercise
describe('Get Shipping Info', () => {
    it('should return shipping unavailable if quote is not available', () => {
        vi.mocked(getShippingQuote).mockReturnValue(null);

        const shipInfo = getShipInfo('India');

        expect(shipInfo).toMatch('Unavailable');
    })

    it('should return estimate days and cost of shipping', () => {
        vi.mocked(getShippingQuote).mockReturnValue({
            cost: 50,
            days: 5
        });

        const shipInfo = getShipInfo('Australia');

        expect(shipInfo).toBe('Shipping Cost: $50 (5 days)');
    })
})

// Integration Testing
describe('Render Page', () => {
    it('should return correct content', async () => {
        const result = await renderPage();
        console.log(result)
        expect(result).toBe('<div>Home Page</div>');
    })

    it('should return correct content', async () => {
        const result = await renderPage();
        console.log(result)
        expect(result).toMatch('Home');
    })

    it("should call analysis", async () => {
        const result = await renderPage('/home');

        expect(trackPageView).toHaveBeenCalledWith('/home');
    })
})

// Exercise Integration Testing
describe('Submit Order', () => {
    // it('should return true when status is failed', async () => {
    //     const result = await submitOrder({ total: 2000 }, 'Beef Pulao');

    //     expect(result).toEqual({
    //         success: true,
    //         message: 'Order placed'
    //     });
    // })
    const order = { total: 2000 };
    const creditCard = 'Beef Pulao';

    it('should return false when status is failed', async () => {
        vi.mocked(charge).mockResolvedValue({ status: 'success' });
        await submitOrder(order, creditCard);

        expect(charge).toHaveBeenCalledWith(creditCard, order.total);

    })

    it('should return success when status is success', async () => {
        vi.mocked(charge).mockResolvedValue({ status: 'success' });
        const result = await submitOrder(order, creditCard);

        expect(result).toEqual({
            success: true,
            message: 'Order placed'
        });
    })
    it('should return failed when status is success', async () => {
        vi.mocked(charge).mockResolvedValue({ status: 'failed' });
        const result = await submitOrder(order, creditCard);

        expect(result).toEqual({
            success: false,
            message: 'Payment failed'
        });
    })

})
