import mongoose, { Schema, Document } from 'mongoose';
import { CartItem, TCart } from './cart.interface';


const CartItemSchema = new Schema<CartItem>({
  productId: { type: String, required: true },
  variantId: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 }
});

const CartSchema = new Schema<TCart & Document>({
  guestToken: { type: String, required: true, unique: true },
  items: [CartItemSchema],
  subtotal: { type: Number, default: 0, min: 0 },
  discount: { type: Number, default: 0, min: 0 },
  total: { type: Number, default: 0, min: 0 },
  promoCode: { type: String }
}, {
  timestamps: true
});

export const CartModel = mongoose.model<TCart & Document>('Cart', CartSchema);
