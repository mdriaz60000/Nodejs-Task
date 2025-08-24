"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/user/user.routes");
const product_route_1 = require("../modules/Product/product.route");
const order_routes_1 = require("../modules/order/order.routes");
const cart_routes_1 = require("../modules/cart/cart.routes");
const promo_route_1 = require("../modules/promo/promo.route");
const checkout_routes_1 = require("../modules/checkout/checkout.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/user",
        route: user_routes_1.UserRouter,
    },
    {
        path: "/product",
        route: product_route_1.ProductRoutes,
    },
    {
        path: "/order",
        route: order_routes_1.OrderRoutes,
    },
    {
        path: "/cart",
        route: cart_routes_1.CartRoutes,
    },
    {
        path: "/promo",
        route: promo_route_1.PromoRoutes,
    },
    {
        path: "/checkout",
        route: checkout_routes_1.CheckoutRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
