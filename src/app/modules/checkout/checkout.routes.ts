import express from 'express';
import { CheckoutController } from './checkout.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { z } from 'zod';
import { checkoutSchema } from './checkout.validation';

const router = express.Router();


router.post('/', 
  validateRequest(z.object({
    body: checkoutSchema
  })),
  CheckoutController.processCheckout
);


router.get('/summary/:guestToken', 
  validateRequest(z.object({
    params: z.object({
      guestToken: z.string().min(1, 'Guest token is required')
    })
  })),
  CheckoutController.getCheckoutSummary
);

export const CheckoutRoutes = router;
