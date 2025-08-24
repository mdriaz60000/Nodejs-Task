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
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_service_1 = require("./user.service");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phoneNumber, profileImage } = req.body;
        const userData = { name, email, password, phoneNumber, profileImage };
        const result = yield user_service_1.UserService.createUserDb(userData);
        res.status(200).json({
            success: true,
            massage: " User created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
//  Get a user by ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params._Id;
        const user = yield user_service_1.UserService.getUserIdDb(id);
        if (!user) {
            res.status(http_status_1.default.NOT_FOUND).json({
                success: false,
                message: 'User not found',
            });
        }
        res.status(http_status_1.default.OK).json({
            success: true,
            data: user,
        });
    }
    catch (error) {
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
});
//  Get all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_service_1.UserService.getAllUserDb();
        res.status(http_status_1.default.OK).json({
            success: true,
            data: users,
        });
    }
    catch (error) {
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
});
// Update a user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params._id;
        const body = req.body;
        const updatedUser = yield user_service_1.UserService.updateUserDb(id, body);
        if (!updatedUser) {
            res.status(http_status_1.default.NOT_FOUND).json({
                success: false,
                message: 'User not found',
            });
        }
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser,
        });
    }
    catch (error) {
        res.status(http_status_1.default.BAD_REQUEST).json({
            success: false,
            message: error.message,
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params._id;
        const deletedUser = yield user_service_1.UserService.deleteUserDb(id);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'User deleted successfully',
        });
    }
    catch (error) {
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
});
exports.UserController = {
    createUser,
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser
};
