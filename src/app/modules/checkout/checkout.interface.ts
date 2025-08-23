export interface CheckoutRequest {
  guestToken: string;
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  promoCode?: string;
}

export interface CheckoutResponse {
  orderId: string;
  orderNumber: string;
  total: number;
  status: string;
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  items: Array<{
    productId: string;
    variantId: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  discount: number;
  promoCode?: string;
  createdAt: Date;
}
