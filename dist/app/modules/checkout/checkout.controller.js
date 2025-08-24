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
exports.CheckoutController = void 0;
const checkout_service_1 = require("./checkout.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const asyncCatch_1 = __importDefault(require("../../utils/asyncCatch"));
const http_status_1 = __importDefault(require("http-status"));
const processCheckout = (0, asyncCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const checkoutData = req.body;
    const result = yield checkout_service_1.CheckoutService.processCheckout(checkoutData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product created successfully',
        data: result,
    });
}));
// Get checkout summary
const getCheckoutSummary = (0, asyncCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { guestToken } = req.params;
    const result = yield checkout_service_1.CheckoutService.getCheckoutSummary(guestToken);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product created successfully',
        data: result,
    });
}));
exports.CheckoutController = {
    processCheckout,
    getCheckoutSummary,
};
