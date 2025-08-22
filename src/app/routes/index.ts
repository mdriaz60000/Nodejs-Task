import express from "express";
import { TestRoutes } from "../modules/testModule/test.route";
import { UserRouter } from "../modules/user/user.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/test",
    route: TestRoutes,
  },
  {
    path: "/user",
    route: UserRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;