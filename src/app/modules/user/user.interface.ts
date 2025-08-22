// /* eslint-disable no-unused-vars */
 import { Model } from 'mongoose';

export interface TUser {
  
  name : string,
  email: string;
  phoneNumber: string
  password: string;
  role:  'admin' | 'user'
  profileImage?: string,
  confirmPassword: string
  isVerified: boolean
  isDeleted: boolean;
}

