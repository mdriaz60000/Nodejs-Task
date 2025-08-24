import { Request, Response, NextFunction } from 'express';
import { CheckoutService } from './checkout.service';
import sendResponse from '../../utils/sendResponse';
import asyncCatch from '../../utils/asyncCatch';
import  httpStatus  from 'http-status';

const processCheckout = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
  const checkoutData = req.body; 
  const result = await CheckoutService.processCheckout(checkoutData);

   sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'Product created successfully',
     data: result,
   });
});


const getCheckoutSummary = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
  const { guestToken } = req.params;

  const result = await CheckoutService.getCheckoutSummary(guestToken);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product created successfully',
      data: result,
    });
});


export const CheckoutController = {
  processCheckout,
  getCheckoutSummary,
};
