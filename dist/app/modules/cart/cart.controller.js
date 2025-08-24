"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartController = void 0;
const asyncCatch_1 = __importDefault(require("../../utils/asyncCatch"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const cart_service_1 = require("./cart.service");
const createOrFetchCart = (0, asyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { guestToken } = req.query;
    const cart = yield cart_service_1.cartService.createOrFetchCart(guestToken);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cart created/fetched successfully',
        data: cart
    });
}));
const getCart = (0, asyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { guestToken } = req.params;
    const cart = yield cart_service_1.cartService.getCart(guestToken);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cart retrieved successfully',
        data: cart
    });
}));
const addItem = (0, asyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { guestToken } = req.params;
    const { productId, variantId, quantity } = req.body;
    const cart = yield cart_service_1.cartService.addItem(guestToken, {
        productId,
        variantId,
        quantity
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Item added to cart successfully',
        data: cart
    });
}));
const updateItem = (0, asyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { guestToken, productId, variantId } = req.params;
    const { quantity } = req.body;
    const cart = yield cart_service_1.cartService.updateItem(guestToken, productId, variantId, quantity);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Item updated successfully',
        data: cart
    });
}));
const removeItem = (0, asyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { guestToken, productId, variantId } = req.params;
    const cart = yield cart_service_1.cartService.removeItem(guestToken, productId, variantId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Item removed from cart successfully',
        data: cart
    });
}));
const applyPromoCode = (0, asyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { guestToken } = req.params;
    const { promoCode } = req.body;
    const cart = yield cart_service_1.cartService.applyPromoCode(guestToken, promoCode);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Promo code applied successfully',
        data: cart
    });
}));
const removePromoCode = (0, asyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { guestToken } = req.params;
    const cart = yield cart_service_1.cartService.removePromoCode(guestToken);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Promo code removed successfully',
        data: cart
    });
}));
const clearCart = (0, asyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { guestToken } = req.params;
    const cart = yield cart_service_1.cartService.clearCart(guestToken);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cart cleared successfully',
        data: cart
    });
}));
exports.cartController = {
    createOrFetchCart,
    getCart,
    addItem,
    updateItem,
    removeItem,
    applyPromoCode,
    removePromoCode,
    clearCart
};
