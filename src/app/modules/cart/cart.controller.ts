import { Request, Response } from 'express';
import catchAsync from '../../utils/asyncCatch';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { cartService } from './cart.service';

const createOrFetchCart = catchAsync(async (req: Request, res: Response) => {
  const { guestToken } = req.query;
  const cart = await cartService.createOrFetchCart(guestToken as string);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart created/fetched successfully',
    data: cart
  });
});

const getCart = catchAsync(async (req: Request, res: Response) => {
  const { guestToken } = req.params;
  const cart = await cartService.getCart(guestToken);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart retrieved successfully',
    data: cart
  });
});

const addItem = catchAsync(async (req: Request, res: Response) => {
  const { guestToken } = req.params;
  const { productId, variantId, quantity } = req.body;

  const cart = await cartService.addItem(guestToken, {
    productId,
    variantId,
    quantity
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Item added to cart successfully',
    data: cart
  });
});

const updateItem = catchAsync(async (req: Request, res: Response) => {
  const { guestToken, productId, variantId } = req.params;
  const { quantity } = req.body;

  const cart = await cartService.updateItem(guestToken, productId, variantId, quantity);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Item updated successfully',
    data: cart
  });
});

const removeItem = catchAsync(async (req: Request, res: Response) => {
  const { guestToken, productId, variantId } = req.params;

  const cart = await cartService.removeItem(guestToken, productId, variantId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Item removed from cart successfully',
    data: cart
  });
});

const applyPromoCode = catchAsync(async (req: Request, res: Response) => {
  const { guestToken } = req.params;
  const { promoCode } = req.body;

  const cart = await cartService.applyPromoCode(guestToken, promoCode);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Promo code applied successfully',
    data: cart
  });
});

const removePromoCode = catchAsync(async (req: Request, res: Response) => {
  const { guestToken } = req.params;

  const cart = await cartService.removePromoCode(guestToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Promo code removed successfully',
    data: cart
  });
});

const clearCart = catchAsync(async (req: Request, res: Response) => {
  const { guestToken } = req.params;

  const cart = await cartService.clearCart(guestToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart cleared successfully',
    data: cart
  });
});

export const cartController = {
  createOrFetchCart,
  getCart,
  addItem,
  updateItem,
  removeItem,
  applyPromoCode,
  removePromoCode,
  clearCart
};
