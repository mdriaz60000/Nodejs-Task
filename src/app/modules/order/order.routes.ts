import express from "express";
import { orderController } from "./order.controller";


const router = express.Router();


router.post("/create", orderController.createOrder);
router.get("/", orderController.getOrder);
router.get("/:id", orderController.getSingleOrder);
router.patch("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);


export const OrderRoutes = router;