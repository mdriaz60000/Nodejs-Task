export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
}

export interface TCart {
  _id?: string;
  guestToken: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  promoCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}