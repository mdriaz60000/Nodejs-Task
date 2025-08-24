"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutRoutes = void 0;
const express_1 = __importDefault(require("express"));
const checkout_controller_1 = require("./checkout.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const zod_1 = require("zod");
const checkout_validation_1 = require("./checkout.validation");
const router = express_1.default.Router();
// Process checkout
router.post('/', (0, validateRequest_1.validateRequest)(zod_1.z.object({
    body: checkout_validation_1.checkoutSchema
})), checkout_controller_1.CheckoutController.processCheckout);
// Get checkout summary
router.get('/summary/:guestToken', (0, validateRequest_1.validateRequest)(zod_1.z.object({
    params: zod_1.z.object({
        guestToken: zod_1.z.string().min(1, 'Guest token is required')
    })
})), checkout_controller_1.CheckoutController.getCheckoutSummary);
exports.CheckoutRoutes = router;
