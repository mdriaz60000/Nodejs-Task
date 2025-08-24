"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromoRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const zod_1 = require("zod");
const promo_validation_1 = require("./promo.validation");
const promo_controller_1 = require("./promo.controller");
const router = express_1.default.Router();
// Create new promo code
router.post('/', (0, validateRequest_1.validateRequest)(zod_1.z.object({
    body: promo_validation_1.createPromoSchema
})), promo_controller_1.promoController.createPromo);
// Get all promo codes
router.get('/', promo_controller_1.promoController.getAllPromos);
// Get active promo codes
router.get('/active', promo_controller_1.promoController.getActivePromos);
// Get promo by ID
router.get('/:id', promo_controller_1.promoController.getPromoById);
// Get promo by code
router.get('/code/:code', promo_controller_1.promoController.getPromoByCode);
// Validate promo code
router.get('/validate/:code', promo_controller_1.promoController.validatePromoCode);
// Update promo
router.put('/:id', (0, validateRequest_1.validateRequest)(zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, 'ID is required')
    }),
    body: promo_validation_1.updatePromoSchema
})), promo_controller_1.promoController.updatePromo);
// Delete promo
router.delete('/:id', promo_controller_1.promoController.deletePromo);
exports.PromoRoutes = router;
