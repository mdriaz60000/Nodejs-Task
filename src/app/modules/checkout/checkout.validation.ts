import { z } from 'zod';


const addressSchema = z.object({
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  country: z.string().min(1, 'Country is required')
});


const customerInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  address: addressSchema
});


export const checkoutSchema = z.object({
  guestToken: z.string().min(1, 'Guest token is required'),
  customerInfo: customerInfoSchema,
  promoCode: z.string().optional()
});

// Guest token validation
export const guestTokenSchema = z.object({
  guestToken: z.string().min(1, 'Guest token is required')
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type GuestTokenInput = z.infer<typeof guestTokenSchema>;
