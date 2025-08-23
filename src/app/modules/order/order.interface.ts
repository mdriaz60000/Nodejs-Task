import { CartItem } from "../cart/cart.interface";

export interface TOrder {
  _id?: string;
  orderNumber: string;
  cartId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  promoCode?: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}