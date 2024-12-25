import { vi, it, expect, describe, beforeEach } from 'vitest'
import { getExchangeRate } from '../../src/lib/currency';
import { getPriceInCurrency, getShipInfo, login, renderPage, signup, submitOrder } from '../../src/mocking/mocking';
import { getShippingQuote } from '../../src/lib/shipping';
import { trackPageView } from '../../src/lib/analytics';
import { charge } from '../../src/lib/payment';
import { isValidEmail, sendEmail } from '../../src/lib/email';
import security from '../../src/lib/security';

vi.mock('../../src/lib/currency');
vi.mock('../../src/lib/shipping');
vi.mock('../../src/lib/analytics');
vi.mock('../../src/lib/payment');
vi.mock('../../src/lib/email', async (originalCall) => {
    const original = await originalCall();

    return {
        ...original,
        sendEmail: vi.fn(original.sendEmail)
    }
});

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

// Exercise Integrating Testing
// describe("SignUp", () => {
//     const email = 'sufiyan@gmail.com'
//     it("should return false if email is not valid", async () => {
//         vi.mocked(isValidEmail).mockReturnValue(false);

//         const result = await signup('test@com');

//         expect(result).toBe(false)
//     });

//     it("should return true if email is valid", async () => {
//         vi.mocked(isValidEmail).mockReturnValue(false);
//         const result = await signup(email);

//         expect(result).toBe(false)
//     });

//     it("should call send email", async () => {
//         vi.mocked(isValidEmail).mockReturnValue(true);
//         const result = await signup(email);

//         expect(sendEmail).toHaveBeenCalledWith(email, 'Welcome to our platform');
//     });
// })


// Parting Testing
describe('Signup', () => {
    const validEmail = 'test@gmail.com'

    // beforeEach(() => {
    //     // clear the mock calls individually
    //     // vi.mocked(sendEmail).mockClear();

    //     // clear all the mock calls at once
    //     vi.clearAllMocks();
    // })
    it('should return false if email is not valid', async () => {
        const result = await signup('a');

        expect(result).toBe(false);
    })

    it('should return true if email is valid', async () => {
        const result = await signup(validEmail);

        expect(result).toBe(true);
    })

    it('should send the welcome email message', async () => {
        const result = await signup(validEmail);

        expect(sendEmail).toHaveBeenCalledWith(validEmail, "Welcome to our platform");
    })

    it('should send the welcome email message 2', async () => {
        const result = await signup(validEmail);

        expect(sendEmail).toHaveBeenCalledOnce();

        const arg = vi.mocked(sendEmail).mock.calls[0]

        expect(arg[0]).toBe(validEmail);
        expect(arg[1]).toMatch('Welcome')
    })
})

describe('Login', () => {
    const email = 'test@gmail.com'
    it('should email the one-time Login code', async () => {
        const spy = vi.spyOn(security, 'generateCode')
        await login(email);

        const spyResult = spy.mock.results[0]
        console.log(spyResult)

        expect(sendEmail).toHaveBeenCalledWith(email, spyResult.value.toString())
    })
})