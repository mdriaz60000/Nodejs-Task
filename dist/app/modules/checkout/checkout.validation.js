"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestTokenSchema = exports.checkoutSchema = void 0;
const zod_1 = require("zod");
// Address validation
const addressSchema = zod_1.z.object({
    street: zod_1.z.string().min(1, 'Street address is required'),
    city: zod_1.z.string().min(1, 'City is required'),
    state: zod_1.z.string().min(1, 'State is required'),
    zipCode: zod_1.z.string().min(1, 'Zip code is required'),
    country: zod_1.z.string().min(1, 'Country is required')
});
// Customer info validation
const customerInfoSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
    email: zod_1.z.string().email('Invalid email address'),
    phone: zod_1.z.string().optional(),
    address: addressSchema
});
// Checkout validation
exports.checkoutSchema = zod_1.z.object({
    guestToken: zod_1.z.string().min(1, 'Guest token is required'),
    customerInfo: customerInfoSchema,
    promoCode: zod_1.z.string().optional()
});
// Guest token validation
exports.guestTokenSchema = zod_1.z.object({
    guestToken: zod_1.z.string().min(1, 'Guest token is required')
});
