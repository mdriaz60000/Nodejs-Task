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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // Use false instead of 0
    },
    confirmPassword: {
        type: String,
        select: false,
        // Don't make this required in schema since it's temporary
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: "user"
    },
    profileImage: { type: String },
    isVerified: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// Single pre-save middleware to handle password hashing
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        // Only hash password if it's modified and exists
        if (user.isModified('password') && user.password) {
            try {
                user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
            }
            catch (error) {
                return next(error);
            }
        }
        // Remove confirmPassword after validation (don't store it)
        if (user.confirmPassword) {
            user.confirmPassword = '';
        }
        next();
    });
});
// Clean up password in response
userSchema.post('save', function (doc, next) {
    doc.password = '';
    doc.confirmPassword = '';
    next();
});
// Static methods
userSchema.statics.isUserExistsByCustomId = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ _id: id }).select('+password'); // Use _id instead of id
    });
};
userSchema.statics.isPasswordMatched = function (plainTextPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plainTextPassword, hashedPassword);
    });
};
// Query middleware to filter deleted users
userSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
userSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
exports.User = (0, mongoose_1.model)('User', userSchema);
