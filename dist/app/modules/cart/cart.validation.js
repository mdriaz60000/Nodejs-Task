"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestTokenSchema = exports.applyPromoSchema = exports.updateItemSchema = exports.addItemSchema = void 0;
const zod_1 = require("zod");
// Add item to cart validation
exports.addItemSchema = zod_1.z.object({
    productId: zod_1.z.string().min(1, 'Product ID is required'),
    variantId: zod_1.z.string().min(1, 'Variant ID is required'),
    quantity: zod_1.z.number().int().positive('Quantity must be a positive integer').min(1, 'Quantity must be at least 1')
});
// Update item validation
exports.updateItemSchema = zod_1.z.object({
    quantity: zod_1.z.number().int().min(0, 'Quantity must be 0 or greater')
});
// Apply promo code validation
exports.applyPromoSchema = zod_1.z.object({
    promoCode: zod_1.z.string().min(1, 'Promo code is required').toUpperCase()
});
// Guest token validation
exports.guestTokenSchema = zod_1.z.object({
    guestToken: zod_1.z.string().min(1, 'Guest token is required')
});
