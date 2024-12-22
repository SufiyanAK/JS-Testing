import { vi, it, expect, describe } from 'vitest'

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