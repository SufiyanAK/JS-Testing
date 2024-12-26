"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDiscount = void 0;
const calculateDiscount = (price, discountCode) => {
    if (typeof price !== 'number' || price <= 0) {
        return 'Invalid price';
    }
    let discount = 0;
    if (discountCode === 'SAVE10') {
        discount = 0.1;
    }
    else if (discountCode === 'SAVE20') {
        discount = 0.2;
    }
    return price * (1 - discount);
};
exports.calculateDiscount = calculateDiscount;
