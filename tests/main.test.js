"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const main_1 = require("../main");
(0, vitest_1.describe)('Calculate Discount', () => {
    (0, vitest_1.it)('should return discounted price if given valid code', () => {
        const discount10 = (0, main_1.calculateDiscount)(10, 'SAVE10');
        const discount20 = (0, main_1.calculateDiscount)(10, 'SAVE20');
        (0, vitest_1.expect)(discount10).toBe(9);
        (0, vitest_1.expect)(discount20).toBe(8);
    });
    (0, vitest_1.it)('should handle Invalid discount code', () => {
        const discount = (0, main_1.calculateDiscount)(10, 'SAVE30');
        (0, vitest_1.expect)(discount).toBe(10);
    });
    (0, vitest_1.it)('should handle negative price', () => {
        const discount = (0, main_1.calculateDiscount)(-10, 'SAVE20');
        (0, vitest_1.expect)(discount).toMatch('Invalid');
    });
});
