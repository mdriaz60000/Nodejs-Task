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
exports.CheckoutService = void 0;
const cart_model_1 = require("../cart/cart.model");
const order_model_1 = require("../order/order.model");
const product_model_1 = require("../Product/product.model");
const promo_model_1 = require("../promo/promo.model");
const validatePromoCode = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const promo = yield promo_model_1.PromoModel.findOne({
        code: code.toUpperCase(),
        isActive: true,
        validFrom: { $lte: new Date() },
        validUntil: { $gte: new Date() },
    });
    if (!promo) {
        throw new Error('Invalid or expired promo code');
    }
    return promo;
});
const validateInventory = (items) => __awaiter(void 0, void 0, void 0, function* () {
    for (const item of items) {
        const product = yield product_model_1.ProductModel.findById(item.productId);
        if (!product) {
            throw new Error(`Product not found: ${item.productId}`);
        }
        const variant = product.variants.find(v => { var _a; return ((_a = v._id) === null || _a === void 0 ? void 0 : _a.toString()) === item.variantId; });
        if (!variant) {
            throw new Error(`Product variant not found: ${item.variantId}`);
        }
        if (variant.inventory < item.quantity) {
            throw new Error(`Insufficient inventory for product: ${product.name} (${variant.sku})`);
        }
    }
});
const updateInventory = (items) => __awaiter(void 0, void 0, void 0, function* () {
    for (const item of items) {
        yield product_model_1.ProductModel.updateOne({ _id: item.productId, 'variants._id': item.variantId }, { $inc: { 'variants.$.inventory': -item.quantity } });
    }
});
const generateOrderNumber = () => {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `ORD-${timestamp}-${random}`;
};
const processCheckout = (checkoutData) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.CartModel.findOne({ guestToken: checkoutData.guestToken });
    if (!cart)
        throw new Error('Cart not found');
    if (cart.items.length === 0)
        throw new Error('Cart is empty');
    // Validate inventory
    yield validateInventory(cart.items);
    // Validate promo code if provided
    let promo = null;
    if (checkoutData.promoCode) {
        promo = yield validatePromoCode(checkoutData.promoCode);
    }
    // Generate order number
    const orderNumber = generateOrderNumber();
    // Create order
    const orderData = {
        orderNumber,
        cartId: cart._id.toString(),
        items: cart.items,
        subtotal: cart.subtotal,
        discount: cart.discount,
        total: cart.total,
        promoCode: cart.promoCode,
        status: 'pending',
    };
    const order = yield order_model_1.OrderModel.create(orderData);
    // Update inventory
    yield updateInventory(cart.items);
    // Clear cart
    yield cart_model_1.CartModel.findByIdAndUpdate(cart._id, {
        items: [],
        subtotal: 0,
        discount: 0,
        total: 0,
        promoCode: undefined,
    });
    // Return checkout response
    return {
        orderId: order._id.toString(),
        orderNumber: order.orderNumber,
        total: order.total,
        status: order.status,
        customerInfo: checkoutData.customerInfo,
        items: order.items,
        subtotal: order.subtotal,
        discount: order.discount,
        promoCode: order.promoCode,
        createdAt: order.createdAt,
    };
});
const getCheckoutSummary = (guestToken) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.CartModel.findOne({ guestToken });
    if (!cart)
        throw new Error('Cart not found');
    if (cart.items.length === 0)
        throw new Error('Cart is empty');
    const itemsWithDetails = yield Promise.all(cart.items.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield product_model_1.ProductModel.findById(item.productId);
        if (!product)
            throw new Error(`Product not found: ${item.productId}`);
        const variant = product.variants.find(v => { var _a; return ((_a = v._id) === null || _a === void 0 ? void 0 : _a.toString()) === item.variantId; });
        if (!variant)
            throw new Error(`Product variant not found: ${item.variantId}`);
        return {
            productId: item.productId,
            variantId: item.variantId,
            productName: product.name,
            variantSku: variant.sku,
            variantAttributes: variant.attributes,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity,
            availableInventory: variant.inventory,
        };
    })));
    return {
        items: itemsWithDetails,
        subtotal: cart.subtotal,
        discount: cart.discount,
        total: cart.total,
        promoCode: cart.promoCode,
        itemCount: cart.items.length,
    };
});
exports.CheckoutService = {
    processCheckout,
    getCheckoutSummary,
    validatePromoCode,
    validateInventory,
    updateInventory,
    generateOrderNumber,
};
