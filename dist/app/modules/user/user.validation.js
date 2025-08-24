"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const UserSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, { message: "name is required" }),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z.string().min(6, { message: "Password must be at least 6 characters long" }),
    needsPasswordChange: zod_1.z.boolean().default(true),
    passwordChangedAt: zod_1.z.date().nullable().default(null),
    role: zod_1.z.enum(['user', 'admin', 'tenant', 'landlord']).default('user'),
    status: zod_1.z.enum(['in-progress', 'blocked']).default('in-progress'),
    isDeleted: zod_1.z.boolean().default(false),
});
