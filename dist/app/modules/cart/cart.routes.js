"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("./cart.controller");
const zod_1 = require("zod");
const cart_validation_1 = require("./cart.validation");
const validateRequest_1 = require("../../middlewares/validateRequest");
const router = express_1.default.Router();
// Create or fetch cart
router.post('/', cart_controller_1.cartController.createOrFetchCart);
// Get cart by guest token
router.get('/:guestToken', cart_controller_1.cartController.getCart);
// Add item to cart
router.post('/:guestToken/items', (0, validateRequest_1.validateRequest)(zod_1.z.object({
    params: zod_1.z.object({
        guestToken: zod_1.z.string().min(1, 'Guest token is required')
    }),
    body: cart_validation_1.addItemSchema
})), cart_controller_1.cartController.addItem);
// Update item quantity
router.put('/:guestToken/items/:productId/:variantId', (0, validateRequest_1.validateRequest)(zod_1.z.object({
    params: zod_1.z.object({
        guestToken: zod_1.z.string().min(1, 'Guest token is required'),
        productId: zod_1.z.string().min(1, 'Product ID is required'),
        variantId: zod_1.z.string().min(1, 'Variant ID is required')
    }),
    body: cart_validation_1.updateItemSchema
})), cart_controller_1.cartController.updateItem);
// Remove item from cart
router.delete('/:guestToken/items/:productId/:variantId', cart_controller_1.cartController.removeItem);
// Apply promo code
router.post('/:guestToken/promo', (0, validateRequest_1.validateRequest)(zod_1.z.object({
    params: zod_1.z.object({
        guestToken: zod_1.z.string().min(1, 'Guest token is required')
    }),
    body: cart_validation_1.applyPromoSchema
})), cart_controller_1.cartController.applyPromoCode);
// Remove promo code
router.delete('/:guestToken/promo', cart_controller_1.cartController.removePromoCode);
// Clear cart
router.delete('/:guestToken', cart_controller_1.cartController.clearCart);
exports.CartRoutes = router;
