import express from "express";
import { UserRouter } from "../modules/user/user.routes";
import { ProductRoutes } from "../modules/Product/product.route";
import { OrderRoutes } from "../modules/order/order.routes";


const router = express.Router();

const moduleRoutes = [
 
  {
    path: "/user",
    route: UserRouter,
  },
  {
    path: "/product",
    route: ProductRoutes,
  },
  {
    path: "/order",
    route: OrderRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;