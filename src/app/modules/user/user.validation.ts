import { z } from 'zod';

const UserSchema = z.object({
  name : z.string().min(2, {message : "name is required"}),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  needsPasswordChange: z.boolean().default(true),
  passwordChangedAt: z.date().nullable().default(null),
  role: z.enum(['user', 'admin', ]).default('user'),
  status: z.enum(['in-progress', 'blocked']).default('in-progress'),
  isDeleted: z.boolean().default(false),
});


