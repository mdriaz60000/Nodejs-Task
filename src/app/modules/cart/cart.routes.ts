import express from 'express';
import { cartController } from './cart.controller';

import { z } from 'zod';
import { addItemSchema, updateItemSchema, applyPromoSchema } from './cart.validation';
import { validateRequest } from '../../middlewares/validateRequest';


const router = express.Router();


router.post('/', cartController.createOrFetchCart);


router.get('/:guestToken', cartController.getCart);


router.post('/:guestToken/items', 
  validateRequest(z.object({
    params: z.object({
      guestToken: z.string().min(1, 'Guest token is required')
    }),
    body: addItemSchema
  })),
  cartController.addItem
);


router.put('/:guestToken/items/:productId/:variantId', 
  validateRequest(z.object({
    params: z.object({
      guestToken: z.string().min(1, 'Guest token is required'),
      productId: z.string().min(1, 'Product ID is required'),
      variantId: z.string().min(1, 'Variant ID is required')
    }),
    body: updateItemSchema
  })),
  cartController.updateItem
);

// Remove item from cart
router.delete('/:guestToken/items/:productId/:variantId', cartController.removeItem);

// Apply promo code
router.post('/:guestToken/promo', 
  validateRequest(z.object({
    params: z.object({
      guestToken: z.string().min(1, 'Guest token is required')
    }),
    body: applyPromoSchema
  })),
  cartController.applyPromoCode
);

// Remove promo code
router.delete('/:guestToken/promo', cartController.removePromoCode);

// Clear cart
router.delete('/:guestToken', cartController.clearCart);

export const CartRoutes = router;
