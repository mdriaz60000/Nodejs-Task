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
Object.defineProperty(exports, "__esModule", { value: true });
exports.promoService = void 0;
const promo_model_1 = require("./promo.model");
const createPromo = (promoData) => __awaiter(void 0, void 0, void 0, function* () {
    const promo = yield promo_model_1.PromoModel.create(promoData);
    return promo;
});
const getAllPromos = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield promo_model_1.PromoModel.find().sort({ createdAt: -1 });
});
const getPromoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield promo_model_1.PromoModel.findById(id);
});
const getPromoByCode = (code) => __awaiter(void 0, void 0, void 0, function* () {
    return yield promo_model_1.PromoModel.findOne({ code: code.toUpperCase() });
});
const updatePromo = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield promo_model_1.PromoModel.findByIdAndUpdate(id, updateData, { new: true });
});
const deletePromo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield promo_model_1.PromoModel.findByIdAndDelete(id);
});
const validatePromoCode = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const promo = yield promo_model_1.PromoModel.findOne({
        code: code.toUpperCase(),
        isActive: true,
    });
    if (!promo) {
        return { isValid: false, message: 'Promo code not found' };
    }
    const now = new Date();
    if (now < promo.validFrom) {
        return { isValid: false, message: 'Promo code not yet valid' };
    }
    if (now > promo.validUntil) {
        return { isValid: false, message: 'Promo code has expired' };
    }
    return { isValid: true, promo };
});
const getActivePromos = () => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    return yield promo_model_1.PromoModel.find({
        isActive: true,
        validFrom: { $lte: now },
        validUntil: { $gte: now },
    }).sort({ createdAt: -1 });
});
const calculateDiscount = (subtotal, promo) => {
    if (promo.type === 'percent') {
        return (subtotal * promo.value) / 100;
    }
    else {
        return Math.min(promo.value, subtotal); // Fixed discount, but not more than subtotal
    }
};
exports.promoService = {
    createPromo,
    getAllPromos,
    getPromoById,
    getPromoByCode,
    updatePromo,
    deletePromo,
    validatePromoCode,
    getActivePromos,
    calculateDiscount,
};
