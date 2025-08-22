import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { UserService } from './user.service';
  
  const  createUser = async (req: Request, res: Response, next : NextFunction) => {
    try {
      const {name, email, password, phoneNumber, profileImage  } = req.body
    
      const userData : any = { name, email, password, phoneNumber, profileImage };
      const result = await UserService.createUserDb(userData)
      res.status(200).json({
        success: true,
        massage: " User created successfully",
        data: result,
      });

    } catch (error) {
     next(error)
    }
  }


  //  Get a user by ID
const getUserById = async (req: Request, res: Response, ) => {
    try {
      const  id = req.params._Id;
      const user = await UserService.getUserIdDb(id);
      if (!user) {
         res.status(httpStatus.NOT_FOUND).json({
          success: false,
          message: 'User not found',
        });
      }
       res.status(httpStatus.OK).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
       res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  //  Get all users
  const getAllUsers = async (req: Request, res: Response) => {
    try {
      
      const users = await UserService.getAllUserDb();
       res.status(httpStatus.OK).json({
        success: true,
        data: users,
      });
    } catch (error: any) {
       res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Update a user
 const updateUser = async (req: Request, res: Response,) => {
    try {
      const  id  = req.params._id;
      const body = req.body
      const updatedUser = await UserService.updateUserDb(id, body);
      if (!updatedUser) {
         res.status(httpStatus.NOT_FOUND).json({
          success: false,
          message: 'User not found',
        });
      }
       res.status(httpStatus.OK).json({
        success: true,
        message: 'User updated successfully',
        data: updatedUser,
      });
    } catch (error: any) {
       res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  
const deleteUser = async(req: Request, res: Response) => {
    try {
      const  id  = req.params._id
      const deletedUser = await UserService.deleteUserDb(id);
  
       res.status(httpStatus.OK).json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error: any) {
       res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  export const UserController = {
     createUser ,
     getAllUsers,
     getUserById,
     deleteUser,
     updateUser

  }

