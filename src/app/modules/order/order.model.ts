import mongoose, { Schema, Document } from 'mongoose';
import { TOrder } from './order.interface';
import { CartItem } from '../cart/cart.interface';


const CartItemSchema = new Schema<CartItem>({
  productId: { type: String, required: true },
  variantId: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 }
});

const OrderSchema = new Schema<TOrder & Document>({
  orderNumber: { type: String, required: true, unique: true },
  cartId: { type: String, required: true },
  items: [CartItemSchema],
  subtotal: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0, min: 0 },
  total: { type: Number, required: true, min: 0 },
  promoCode: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });

export const OrderModel = mongoose.model<TOrder & Document>('Order', OrderSchema);
