export interface ProductVariant {
  _id?: string;
  sku: string;
  price: number;
  inventory: number;
  attributes: Record<string, string>; // e.g., { color: "red", size: "M" }
}

export interface TProduct {
  _id?: string;
  name: string;
  description: string;
  category: string;
  variants: ProductVariant[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}
