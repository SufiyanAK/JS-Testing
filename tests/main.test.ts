import { it, expect, describe } from 'vitest';
import { calculateDiscount } from '../src/main';

describe('Calculate Discount', () => {
  it('should return discounted price if given valid code', () => {
    const discount10 = calculateDiscount(10, 'SAVE10');
    const discount20 = calculateDiscount(10, 'SAVE20');

    expect(discount10).toBe(9);
    expect(discount20).toBe(8);
  });

  it('should handle Invalid discount code', () => {
    const discount = calculateDiscount(10, 'SAVE30');

    expect(discount).toBe(10);
  });

  it('should handle negative price', () => {
    const discount = calculateDiscount(-10, 'SAVE20');

    expect(discount).toMatch('Invalid');
  });
});
