// import { Request, Response, NextFunction } from 'express';
// import { ZodError, ZodObject } from 'zod';
// import  httpStatus  from 'http-status';
// import sendResponse from '../utils/sendResponse';


// export const validateRequest = (schema: ZodObject<any>) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       // Validate request data based on the schema
//       const validatedData = await schema.parseAsync({
//         body: req.body,
//         query: req.query,
//         params: req.params,
//       });

//       // Replace request data with validated data
//       req.body = validatedData.body;
//       req.query = validatedData.query as import('qs').ParsedQs;
//       req.params = validatedData.params as import('express-serve-static-core').ParamsDictionary;

//       next();
//     } catch (error) {
//       if (error instanceof ZodError) {
//         const errorMessages = error.issues.map(err => err.message);
        
//         return sendResponse(res, {
//           statusCode: httpStatus.BAD_REQUEST,
//           success: false,
//           message: 'Validation failed',
//           errors: errorMessages
//         });
//       }
      
//       next(error);
//     }
//   };
// };


import { NextFunction, Request, Response } from 'express';
import { ZodObject } from 'zod';
import catchAsync from '../utils/asyncCatch';


const validateRequest = (schema: ZodObject<any>) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
    });

    next();
  });
};

export default validateRequest;
