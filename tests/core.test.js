import { it, expect, describe, beforeEach, beforeAll, afterEach, afterAll } from "vitest";
import { calculateDiscount, canDrive, fetchData, getCoupon, isPriceInRange, isValidUserName, Stack, validateUserInput } from "../src/core";

describe("It Suits", () => {
    it("Test Case", () => {
        const result = 'the requested file was not found'
        // Loose (too general)
        // expect(result).toBeDefined();

        // Tight (too Specific)
        // expect(result).not.toBe('the requested file was found');

        // Better Assertion
        // expect(result).toContain('not found');
        expect(result).toMatch("not found")
    })
})

describe("It Suits", () => {
    it("Test Case", () => {
        const result = [1, 2, 3]
        // Loose (too general)
        // expect(result).toBeDefined();

        // Tight (too Specific)
        expect(result).toEqual([1, 2, 3]);

        // Better Assertion
        expect(result).toEqual(expect.arrayContaining([1, 2, 3]));
    })
})

describe("It Suits", () => {
    it("Test Case", () => {
        const result = { name: "John" }
        // Loose (too general)
        // expect(result).toBeDefined();

        expect(result).toMatchObject({ name: "John" })
        expect(result).toHaveProperty('name')
    })
})

describe("Get Coupon", () => {
    it("Should check for values in array", () => {
        const result = getCoupon()

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0)
    })

    it('should return an array with valid coupon codes', () => {
        const result = getCoupon();
        result.forEach((c) => {
            expect(c).toHaveProperty('code');
            expect(typeof c.code).toBe('string');
            expect(c.code).toBeTruthy()
        })
    });

    it('should return an array with valid discount', () => {
        const result = getCoupon();
        result.forEach((c) => {
            expect(c).toHaveProperty('discount');
            expect(typeof c.discount).toBe('number');
            expect(c.discount).toBeTruthy();
            expect(c.discount).toBeGreaterThanOrEqual(0);
        })
    })
})

describe('Calculate Discount', () => {
    it('should return discounted price if given valid code', () => {
        const discount10 = calculateDiscount(10, 'SAVE10');
        const discount20 = calculateDiscount(10, 'SAVE20');

        expect(discount10).toBe(9);
        expect(discount20).toBe(8);
    })

    it('should handle non-numeric price', () => {
        const discount = calculateDiscount(10, 20);

        expect(discount).toMatch('Invalid');
    })

    it('should handle Invalid discount code', () => {
        const discount = calculateDiscount(10, 'SAVE30');

        expect(discount).toBe(10);
    })

    it('should handle negative price', () => {
        const discount = calculateDiscount(-10, 'SAVE20');

        expect(discount).toMatch('Invalid');
    })
})

describe('Validate User Input', () => {
    it('should return successful validation', () => {
        const valid = validateUserInput('sufiyan', 22)

        expect(valid).toMatch('validation');
    })

    it('should return an error if username is not a string', () => {
        const valid = validateUserInput(1, 22)

        expect(valid).toMatch('Invalid');
    })

    it('should return an error if username length is less then 3', () => {
        const valid = validateUserInput('su', 22)

        expect(valid).toMatch('Invalid');
    })

    it('should return an error if username length is greater then 255', () => {
        const valid = validateUserInput('S'.repeat(256), 22)

        expect(valid).toMatch('Invalid');
    })

    it('should return an error if age is not a number', () => {
        const valid = validateUserInput('sufiyan', '22')

        expect(valid).toMatch('Invalid');
    })

    it('should return an error if age is less then 18 and greater then 65', () => {
        const valid = validateUserInput('sufiyan', 17)

        expect(valid).toMatch('Invalid');
    })

    it('should return an error if both username and age is invalid', () => {
        const valid1 = validateUserInput(2, '17')
        const valid2 = validateUserInput(2, '17')

        expect(valid1).toMatch('Invalid username');
        expect(valid2).toMatch('Invalid age');
    })
})

// Boundary Testing
describe('Is Price In Range', () => {
    // Parameterized Test
    it.each([
        { price: 10, min: 11, max: 20, expected: false },
        { price: 21, min: 11, max: 20, expected: false },
        { price: 11, min: 11, max: 20, expected: true },
        { price: 20, min: 11, max: 20, expected: true },
        { price: 14, min: 11, max: 20, expected: true },
    ])('should return $expected when price is $price and min is $min and max is $max', ({ price, min, max, expected }) => {
        expect(isPriceInRange(price, min, max)).toBe(expected);
    })
})

// Boundary Testing Exercises
describe('Is Valid Username', () => {
    it('should return False when input length is less or greater then the limit', () => {
        expect(isValidUserName("user")).toBeFalsy();
        expect(isValidUserName("Sufiyan Ahmed Khan")).toBeFalsy();
    })

    it('should return True when input is on the minimum and maximum limit', () => {
        expect(isValidUserName("userN")).toBeTruthy();
        expect(isValidUserName("sufiyanahmedkha")).toBeTruthy();
    })

    it('should return True when input is in the limit', () => {
        expect(isValidUserName("Sufiyan")).toBeTruthy();
    })

    it('should return Invalid if username is null', () => {
        expect(isValidUserName(null)).toMatch('Invalid');
    })

    it('should return Invalid if username is not a string', () => {
        expect(isValidUserName(123)).toMatch('Invalid');
    });
})

// Boundary Testing Exercises
describe('Can Drive', () => {
    // Parameterized Test
    it.each([
        { age: '15', country: 'US', expected: 'Invalid age' },
        { age: 0, country: 'US', expected: 'Invalid age' },
        { age: 18, country: 123, expected: 'Invalid country code' },
        { age: 15, country: 'US', expected: false },
        { age: 16, country: 'US', expected: true },
        { age: 17, country: 'US', expected: true },
        { age: '16', country: 'UK', expected: 'Invalid age' },
        { age: 0, country: 'UK', expected: 'Invalid age' },
        { age: 19, country: 123, expected: 'Invalid country code' },
        { age: 16, country: 'UK', expected: false },
        { age: 17, country: 'UK', expected: true },
        { age: 18, country: 'UK', expected: true },
        { age: '15', country: 'PK', expected: 'Invalid age' },
        { age: 0, country: 'PK', expected: 'Invalid age' },
        { age: 18, country: 123, expected: 'Invalid country code' },
        { age: 17, country: 'PK', expected: false },
        { age: 18, country: 'PK', expected: true },
        { age: 19, country: 'PK', expected: true },

    ])('should return $expected when age is $age and country is $country', ({ age, country, expected }) => {
        expect(canDrive(age, country)).toBe(expected);
    })
})

// Testing Asynchronous Code
describe('Fetch Data', () => {
    it('should return a promise that will resolve an array of Name', async () => {
        try {
            const result = await fetchData();
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThan(0);
        } catch (error) {
            expect(error).toHaveProperty('reason');
            expect(error.reason).toMatch('Network Error');
        }

        // fetchData().then((result) => {
        //     expect(Array.isArray(result)).toBe(true);
        //     expect(result.length).toBeGreaterThan(0);
        // })
    })
})

// Setup and Teardown
describe('Test Suite', () => {
    beforeAll(() => {
        console.log('Before All')
    });

    beforeEach(() => {
        console.log('Before Each')
    });

    it('test case 1', () => {

    })

    it('test case 2', () => {

    })

    afterEach(() => {
        console.log('After Each')
    })

    afterAll(() => {
        console.log('After All')
    })
})

// setup and teardown
describe('Stack', () => {
    let stack;

    beforeEach(() => {
        stack = new Stack();
    });

    it('push should add an item in the stack', () => {
        stack.push(1);
        stack.push(2);

        expect(stack.stack).toEqual([1, 2]);
        expect(stack.size()).toBe(2);

    })

    it('pop should remove the last item from the stack', () => {
        stack.push(1);
        stack.push(2);

        expect(stack.pop()).toBe(2);
        expect(stack.size()).toBe(1);
    })

    it('pop should throw an error if stack is empty', () => {
        expect(() => stack.pop()).toThrow('Stack is empty');
    })

    it('peek should return the last item from the stack', () => {
        stack.push(1);
        stack.push(2);

        expect(stack.peek()).toBe(2);
        expect(stack.size()).toBe(2);
    })

    it('peek should throw an error if stack is empty', () => {
        expect(() => stack.peek()).toThrow('Stack is empty');
    })

    it('isEmpty should return true if stack is empty', () => {
        expect(stack.isEmpty()).toBe(true);
    })

    it('isEmpty should return false if stack is not empty', () => {
        stack.push(1);

        expect(stack.isEmpty()).toBe(false);
    })
})