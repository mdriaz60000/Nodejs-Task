import express from 'express';

import { validateRequest } from '../../middlewares/validateRequest';
import { z } from 'zod';
import { createPromoSchema, updatePromoSchema } from './promo.validation';
import { promoController } from './promo.controller';

const router = express.Router();

// Create new promo code
router.post('/', 
  validateRequest(z.object({
    body: createPromoSchema
  })),
  promoController.createPromo
);

// Get all promo codes
router.get('/', promoController.getAllPromos);

// Get active promo codes
router.get('/active', promoController.getActivePromos);

// Get promo by ID
router.get('/:id', promoController.getPromoById);

// Get promo by code
router.get('/code/:code', promoController.getPromoByCode);

// Validate promo code
router.get('/validate/:code', promoController.validatePromoCode);

// Update promo
router.put('/:id', 
  validateRequest(z.object({
    params: z.object({
      id: z.string().min(1, 'ID is required')
    }),
    body: updatePromoSchema
  })),
  promoController.updatePromo
);

// Delete promo
router.delete('/:id', promoController.deletePromo);

export const PromoRoutes = router;
