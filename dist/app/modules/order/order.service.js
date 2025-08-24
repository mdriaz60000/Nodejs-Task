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
exports.orderService = void 0;
const order_model_1 = require("./order.model");
const createFromDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const orderNumber = `ORD-${Date.now()}`;
    console.log(payload);
    // calculate subtotal
    const subtotal = payload.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // apply discount if any
    const discount = payload.discount || 0;
    // total
    const total = subtotal - discount;
    const order = yield order_model_1.OrderModel.create(Object.assign(Object.assign({}, payload), { orderNumber,
        subtotal,
        total,
        discount }));
    return order;
});
const getFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.OrderModel.find();
});
const getSingleFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.OrderModel.findOne({ _id: id });
});
const updateFromDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.OrderModel.findOneAndUpdate({ _id: id }, payload, { new: true });
});
const deleteFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.OrderModel.findOneAndDelete({ _id: id });
});
exports.orderService = {
    createFromDb,
    getFromDb,
    getSingleFromDb,
    updateFromDb,
    deleteFromDb
};
