import { Request, Response } from 'express';
import catchAsync from '../../utils/asyncCatch';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { promoService } from './promo.service';

const createPromo = catchAsync(async (req: Request, res: Response) => {
  const promoData = req.body;
  const result = await promoService.createPromo(promoData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Promo code created successfully',
    data: result,
  });
});

const getAllPromos = catchAsync(async (req: Request, res: Response) => {
  const promos = await promoService.getAllPromos();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Promo codes retrieved successfully',
    data: promos,
  });
});

const getActivePromos = catchAsync(async (req: Request, res: Response) => {
  const promos = await promoService.getActivePromos();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Active promo codes retrieved successfully',
    data: promos,
  });
});

const getPromoById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const promo = await promoService.getPromoById(id);



  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Promo code retrieved successfully',
    data: promo,
  });
});

const getPromoByCode = catchAsync(async (req: Request, res: Response) => {
  const { code } = req.params;
  const promo = await promoService.getPromoByCode(code);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Promo code retrieved successfully',
    data: promo,
  });
});

const updatePromo = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  const promo = await promoService.updatePromo(id, updateData);



  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Promo code updated successfully',
    data: promo,
  });
});

const deletePromo = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const promo = await promoService.deletePromo(id);

  

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Promo code deleted successfully',
    data: promo,
  });
});

const validatePromoCode = catchAsync(async (req: Request, res: Response) => {
  const { code } = req.params;
  const validation = await promoService.validatePromoCode(code);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Promo code is valid',
    data: validation.promo,
  });
});

export const promoController = {
  createPromo,
  getAllPromos,
  getActivePromos,
  getPromoById,
  getPromoByCode,
  updatePromo,
  deletePromo,
  validatePromoCode,
};
