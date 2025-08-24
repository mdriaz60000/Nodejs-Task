import { z } from 'zod';


export const addItemSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  variantId: z.string().min(1, 'Variant ID is required'),
  quantity: z.number().int().positive('Quantity must be a positive integer').min(1, 'Quantity must be at least 1')
});


export const updateItemSchema = z.object({
  quantity: z.number().int().min(0, 'Quantity must be 0 or greater')
});

export const applyPromoSchema = z.object({
  promoCode: z.string().min(1, 'Promo code is required').toUpperCase()
});


export const guestTokenSchema = z.object({
  guestToken: z.string().min(1, 'Guest token is required')
});

export type AddItemInput = z.infer<typeof addItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;
export type ApplyPromoInput = z.infer<typeof applyPromoSchema>;
export type GuestTokenInput = z.infer<typeof guestTokenSchema>;
