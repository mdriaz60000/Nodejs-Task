import { Request, Response } from "express";
import catchAsync from "../../utils/asyncCatch";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { productService } from "./product.service";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.createFromDb(req.body);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

const getProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.getFromDb();
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product get successfully',
    data: result,
  });
});
const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await productService.getSingleFromDb(id);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product single get successfully',
    data: result,
  });
});



export const productController = {
createProduct,
getProduct,
getSingleProduct

}
