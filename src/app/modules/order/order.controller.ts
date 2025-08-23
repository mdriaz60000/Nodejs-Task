import { Request, Response } from "express";
import catchAsync from "../../utils/asyncCatch";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { orderService } from "./order.service";


const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.createFromDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getFromDb();
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order get successfully',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await orderService.getSingleFromDb(id);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order single get successfully',
    data: result,
  });
});

const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const {payload} = req.body;
  const result = await orderService.updateFromDb(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order updated successfully',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
 
  const result = await orderService.deleteFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order delete successfully',
    data: result,
  });
});



export const orderController = {
createOrder,
getOrder,
getSingleOrder,
updateOrder,
deleteOrder

}
