import express from "express";
import { productController } from "./product.controller";

const router = express.Router();


router.post("/create", productController.createProduct);
router.get("/", productController.getProduct);
router.get("/:id", productController.getSingleProduct);


export const ProductRoutes = router;