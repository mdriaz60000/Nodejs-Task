import mongoose, { Schema, model } from 'mongoose';
import bcrypt from "bcrypt";
import { TUser } from './user.interface';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
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
  },
  {
    timestamps: true, 
  }
);

// Single pre-save middleware to handle password hashing
userSchema.pre('save', async function (next) {
  const user = this;
  
  // Only hash password if it's modified and exists
  if (user.isModified('password') && user.password) {
    try {
      user.password = await bcrypt.hash(
        user.password, 
        Number(config.bcrypt_salt_rounds)
      );
    } catch (error) {
      return next(error as mongoose.CallbackError);
    }
  }

  // Remove confirmPassword after validation (don't store it)
  if (user.confirmPassword) {
    user.confirmPassword = '';
  }

  next();
});

// Clean up password in response
userSchema.post('save', function (doc, next) {
  doc.password = '';
  doc.confirmPassword = '';
  next();
});

// Static methods
userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ _id: id }).select('+password'); // Use _id instead of id
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
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

export const User = model<TUser>('User', userSchema);