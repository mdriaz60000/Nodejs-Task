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
exports.promoController = void 0;
const asyncCatch_1 = __importDefault(require("../../utils/asyncCatch"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const promo_service_1 = require("./promo.service");
const createPromo = (0, asyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const promoData = req.body;
    const result = yield promo_service_1.promoService.createPromo(promoData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Promo code created successfully',
        data: result,
    });
}));
const getAllPromos = (0, asyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const promos = yield promo_service_1.promoService.getAllPromos();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Promo codes retrieved successfully',
        data: promos,
    });
}));
const getActivePromos = (0, asyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const promos = yield promo_service_1.promoService.getActivePromos();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Active promo codes retrieved successfully',
        data: promos,
    });
}));
const getPromoById = (0, asyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const promo = yield promo_service_1.promoService.getPromoById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Promo code retrieved successfully',
        data: promo,
    });
}));
const getPromoByCode = (0, asyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const promo = yield promo_service_1.promoService.getPromoByCode(code);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Promo code retrieved successfully',
        data: promo,
    });
}));
const updatePromo = (0, asyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    const promo = yield promo_service_1.promoService.updatePromo(id, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Promo code updated successfully',
        data: promo,
    });
}));
const deletePromo = (0, asyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const promo = yield promo_service_1.promoService.deletePromo(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Promo code deleted successfully',
        data: promo,
    });
}));
const validatePromoCode = (0, asyncCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const validation = yield promo_service_1.promoService.validatePromoCode(code);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Promo code is valid',
        data: validation.promo,
    });
}));
exports.promoController = {
    createPromo,
    getAllPromos,
    getActivePromos,
    getPromoById,
    getPromoByCode,
    updatePromo,
    deletePromo,
    validatePromoCode,
};
