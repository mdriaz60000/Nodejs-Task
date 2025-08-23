import express from "express";
import { UserRouter } from "../modules/user/user.routes";
import { ProductRoutes } from "../modules/Product/product.route";
import { OrderRoutes } from "../modules/order/order.routes";
import { CartRoutes } from "../modules/cart/cart.routes";
import { PromoRoutes } from "../modules/promo/promo.route";
import { CheckoutRoutes } from "../modules/checkout/checkout.routes";

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
  {
    path: "/cart",
    route: CartRoutes,
  },
  {
    path: "/promo",
    route: PromoRoutes,
  },
  {
    path: "/checkout",
    route: CheckoutRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;