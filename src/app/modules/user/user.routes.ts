import express from 'express';
import { UserController } from './user.controller';


const router = express.Router();

router.post("/create",  UserController.createUser) 

router.get("/",  UserController.getAllUsers) 

router.get("/:id",  UserController.getUserById) 

router.put("/user/:id",  UserController.updateUser) 

router.delete("/user/:id",   UserController.deleteUser) 


export const UserRouter = router;
