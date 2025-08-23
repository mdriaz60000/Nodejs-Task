import { z } from 'zod';

// Create promo validation
export const createPromoSchema = z.object({
  code: z.string().min(1, 'Promo code is required').toUpperCase(),
  type: z.enum(['percent', 'fixed'], { message: 'Type must be either percent or fixed' }),
  value: z.number().positive('Value must be positive'),
  validFrom: z.string().datetime('Valid from must be a valid date'),
  validUntil: z.string().datetime('Valid until must be a valid date'),
  isActive: z.boolean().default(true)
}).refine((data) => {
  const validFrom = new Date(data.validFrom);
  const validUntil = new Date(data.validUntil);
  return validUntil > validFrom;
}, {
  message: 'Valid until must be after valid from',
  path: ['validUntil']
});

// Update promo validation
export const updatePromoSchema = z.object({
  code: z.string().min(1, 'Promo code is required').toUpperCase().optional(),
  type: z.enum(['percent', 'fixed'], { message: 'Type must be either percent or fixed' }).optional(),
  value: z.number().positive('Value must be positive').optional(),
  validFrom: z.string().datetime('Valid from must be a valid date').optional(),
  validUntil: z.string().datetime('Valid until must be a valid date').optional(),
  isActive: z.boolean().optional()
});

// Promo code validation
export const promoCodeSchema = z.object({
  code: z.string().min(1, 'Promo code is required').toUpperCase()
});

// ID validation
export const idSchema = z.object({
  id: z.string().min(1, 'ID is required')
});

export type CreatePromoInput = z.infer<typeof createPromoSchema>;
export type UpdatePromoInput = z.infer<typeof updatePromoSchema>;
export type PromoCodeInput = z.infer<typeof promoCodeSchema>;
export type IdInput = z.infer<typeof idSchema>;
