"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idSchema = exports.promoCodeSchema = exports.updatePromoSchema = exports.createPromoSchema = void 0;
const zod_1 = require("zod");
// Create promo validation
exports.createPromoSchema = zod_1.z.object({
    code: zod_1.z.string().min(1, 'Promo code is required').toUpperCase(),
    type: zod_1.z.enum(['percent', 'fixed'], { message: 'Type must be either percent or fixed' }),
    value: zod_1.z.number().positive('Value must be positive'),
    validFrom: zod_1.z.string().datetime('Valid from must be a valid date'),
    validUntil: zod_1.z.string().datetime('Valid until must be a valid date'),
    isActive: zod_1.z.boolean().default(true)
}).refine((data) => {
    const validFrom = new Date(data.validFrom);
    const validUntil = new Date(data.validUntil);
    return validUntil > validFrom;
}, {
    message: 'Valid until must be after valid from',
    path: ['validUntil']
});
// Update promo validation
exports.updatePromoSchema = zod_1.z.object({
    code: zod_1.z.string().min(1, 'Promo code is required').toUpperCase().optional(),
    type: zod_1.z.enum(['percent', 'fixed'], { message: 'Type must be either percent or fixed' }).optional(),
    value: zod_1.z.number().positive('Value must be positive').optional(),
    validFrom: zod_1.z.string().datetime('Valid from must be a valid date').optional(),
    validUntil: zod_1.z.string().datetime('Valid until must be a valid date').optional(),
    isActive: zod_1.z.boolean().optional()
});
// Promo code validation
exports.promoCodeSchema = zod_1.z.object({
    code: zod_1.z.string().min(1, 'Promo code is required').toUpperCase()
});
// ID validation
exports.idSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, 'ID is required')
});
