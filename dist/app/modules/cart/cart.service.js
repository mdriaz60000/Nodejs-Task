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
exports.cartService = void 0;
const cart_model_1 = require("./cart.model");
const product_model_1 = require("../Product/product.model");
const promo_model_1 = require("../promo/promo.model");
const uuid_1 = require("uuid");
const createOrFetchCart = (guestToken) => __awaiter(void 0, void 0, void 0, function* () {
    if (!guestToken) {
        guestToken = (0, uuid_1.v4)();
    }
    let cart = yield cart_model_1.CartModel.findOne({ guestToken });
    if (!cart) {
        cart = yield cart_model_1.CartModel.create({
            guestToken,
            items: [],
            subtotal: 0,
            discount: 0,
            total: 0
        });
    }
    return cart;
});
const addItem = (guestToken, item) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.CartModel.findOne({ guestToken });
    if (!cart) {
        throw new Error('Cart not found');
    }
    // Get product variant to verify price and inventory
    const product = yield product_model_1.ProductModel.findById(item.productId);
    if (!product) {
        throw new Error('Product not found');
    }
    const variant = product.variants.find(v => { var _a; return ((_a = v._id) === null || _a === void 0 ? void 0 : _a.toString()) === item.variantId; });
    if (!variant) {
        throw new Error('Product variant not found');
    }
    if (variant.inventory < item.quantity) {
        throw new Error('Insufficient inventory');
    }
    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(cartItem => cartItem.productId === item.productId && cartItem.variantId === item.variantId);
    if (existingItemIndex > -1) {
        // Update existing item
        cart.items[existingItemIndex].quantity += item.quantity;
        cart.items[existingItemIndex].price = variant.price;
    }
    else {
        // Add new item
        cart.items.push(Object.assign(Object.assign({}, item), { price: variant.price }));
    }
    yield calculateCartTotals(cart);
    return yield cart.save();
});
const updateItem = (guestToken, productId, variantId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.CartModel.findOne({ guestToken });
    if (!cart) {
        throw new Error('Cart not found');
    }
    const itemIndex = cart.items.findIndex(item => item.productId === productId && item.variantId === variantId);
    if (itemIndex === -1) {
        throw new Error('Item not found in cart');
    }
    if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        cart.items.splice(itemIndex, 1);
    }
    else {
        // Update quantity
        cart.items[itemIndex].quantity = quantity;
    }
    yield calculateCartTotals(cart);
    return yield cart.save();
});
const removeItem = (guestToken, productId, variantId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.CartModel.findOne({ guestToken });
    if (!cart) {
        throw new Error('Cart not found');
    }
    const itemIndex = cart.items.findIndex(item => item.productId === productId && item.variantId === variantId);
    if (itemIndex === -1) {
        throw new Error('Item not found in cart');
    }
    cart.items.splice(itemIndex, 1);
    yield calculateCartTotals(cart);
    return yield cart.save();
});
const applyPromoCode = (guestToken, promoCode) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.CartModel.findOne({ guestToken });
    if (!cart) {
        throw new Error('Cart not found');
    }
    const promo = yield promo_model_1.PromoModel.findOne({
        code: promoCode.toUpperCase(),
        isActive: true,
        validFrom: { $lte: new Date() },
        validUntil: { $gte: new Date() }
    });
    if (!promo) {
        throw new Error('Invalid or expired promo code');
    }
    cart.promoCode = promo.code;
    yield calculateCartTotals(cart, promo);
    return yield cart.save();
});
const removePromoCode = (guestToken) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.CartModel.findOne({ guestToken });
    if (!cart) {
        throw new Error('Cart not found');
    }
    cart.promoCode = undefined;
    yield calculateCartTotals(cart);
    return yield cart.save();
});
const getCart = (guestToken) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.CartModel.findOne({ guestToken });
});
const clearCart = (guestToken) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.CartModel.findOne({ guestToken });
    if (!cart) {
        throw new Error('Cart not found');
    }
    cart.items = [];
    cart.subtotal = 0;
    cart.discount = 0;
    cart.total = 0;
    cart.promoCode = undefined;
    return yield cart.save();
});
// Calculate cart totals
const calculateCartTotals = (cart, promo) => __awaiter(void 0, void 0, void 0, function* () {
    let subtotal = 0;
    // Calculate subtotal
    for (const item of cart.items) {
        subtotal += item.price * item.quantity;
    }
    cart.subtotal = subtotal;
    // Calculate discount if promo is applied
    if (promo && cart.promoCode === promo.code) {
        if (promo.type === 'percent') {
            cart.discount = (subtotal * promo.value) / 100;
        }
        else {
            cart.discount = Math.min(promo.value, subtotal); // Fixed discount, but not more than subtotal
        }
    }
    else {
        cart.discount = 0;
    }
    cart.total = subtotal - cart.discount;
});
exports.cartService = {
    createOrFetchCart,
    addItem,
    updateItem,
    removeItem,
    applyPromoCode,
    removePromoCode,
    getCart,
    clearCart,
    calculateCartTotals
};
