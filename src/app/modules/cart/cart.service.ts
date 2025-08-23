import { CartModel } from './cart.model';
import { TCart, CartItem } from './cart.interface';
import { ProductModel } from '../Product/product.model';
import { PromoModel } from '../promo/promo.model';
import { v4 as uuidv4 } from 'uuid';

const createOrFetchCart = async (guestToken?: string): Promise<TCart> => {
  if (!guestToken) {
    guestToken = uuidv4();
  }

  let cart = await CartModel.findOne({ guestToken });
  
  if (!cart) {
    cart = await CartModel.create({
      guestToken,
      items: [],
      subtotal: 0,
      discount: 0,
      total: 0
    });
  }

  return cart;
};

const addItem = async (guestToken: string, item: Omit<CartItem, 'price'>): Promise<TCart> => {
  const cart = await CartModel.findOne({ guestToken });
  if (!cart) {
    throw new Error('Cart not found');
  }

  // Get product variant to verify price and inventory
  const product = await ProductModel.findById(item.productId);
  if (!product) {
    throw new Error('Product not found');
  }

  const variant = product.variants.find(v => v._id?.toString() === item.variantId);
  if (!variant) {
    throw new Error('Product variant not found');
  }

  if (variant.inventory < item.quantity) {
    throw new Error('Insufficient inventory');
  }

  // Check if item already exists in cart
  const existingItemIndex = cart.items.findIndex(
    cartItem => cartItem.productId === item.productId && cartItem.variantId === item.variantId
  );

  if (existingItemIndex > -1) {
    // Update existing item
    cart.items[existingItemIndex].quantity += item.quantity;
    cart.items[existingItemIndex].price = variant.price;
  } else {
    // Add new item
    cart.items.push({
      ...item,
      price: variant.price
    });
  }

  await calculateCartTotals(cart);
  return await cart.save();
};

const updateItem = async (guestToken: string, productId: string, variantId: string, quantity: number): Promise<TCart> => {
  const cart = await CartModel.findOne({ guestToken });
  if (!cart) {
    throw new Error('Cart not found');
  }

  const itemIndex = cart.items.findIndex(
    item => item.productId === productId && item.variantId === variantId
  );

  if (itemIndex === -1) {
    throw new Error('Item not found in cart');
  }

  if (quantity <= 0) {
    // Remove item if quantity is 0 or negative
    cart.items.splice(itemIndex, 1);
  } else {
    // Update quantity
    cart.items[itemIndex].quantity = quantity;
  }

  await calculateCartTotals(cart);
  return await cart.save();
};

const removeItem = async (guestToken: string, productId: string, variantId: string): Promise<TCart> => {
  const cart = await CartModel.findOne({ guestToken });
  if (!cart) {
    throw new Error('Cart not found');
  }

  const itemIndex = cart.items.findIndex(
    item => item.productId === productId && item.variantId === variantId
  );

  if (itemIndex === -1) {
    throw new Error('Item not found in cart');
  }

  cart.items.splice(itemIndex, 1);
  await calculateCartTotals(cart);
  return await cart.save();
};

const applyPromoCode = async (guestToken: string, promoCode: string): Promise<TCart> => {
  const cart = await CartModel.findOne({ guestToken });
  if (!cart) {
    throw new Error('Cart not found');
  }

  const promo = await PromoModel.findOne({ 
    code: promoCode.toUpperCase(),
    isActive: true,
    validFrom: { $lte: new Date() },
    validUntil: { $gte: new Date() }
  });

  if (!promo) {
    throw new Error('Invalid or expired promo code');
  }

  cart.promoCode = promo.code;
  await calculateCartTotals(cart, promo);
  return await cart.save();
};

const removePromoCode = async (guestToken: string): Promise<TCart> => {
  const cart = await CartModel.findOne({ guestToken });
  if (!cart) {
    throw new Error('Cart not found');
  }

  cart.promoCode = undefined;
  await calculateCartTotals(cart);
  return await cart.save();
};

const getCart = async (guestToken: string): Promise<TCart | null> => {
  return await CartModel.findOne({ guestToken });
};

const clearCart = async (guestToken: string): Promise<TCart> => {
  const cart = await CartModel.findOne({ guestToken });
  if (!cart) {
    throw new Error('Cart not found');
  }

  cart.items = [];
  cart.subtotal = 0;
  cart.discount = 0;
  cart.total = 0;
  cart.promoCode = undefined;

  return await cart.save();
};

// Calculate cart totals
const calculateCartTotals = async (cart: any, promo?: any): Promise<void> => {
  let subtotal = 0;
  
  // Calculate subtotal
  for (const item of cart.items) {
    subtotal += item.price * item.quantity;
  }

  cart.subtotal = subtotal;

  // Calculate discount if promo is applied
  if (promo && cart.promoCode === promo.code) {
    if (promo.type === 'percent') {
      cart.discount = (subtotal * promo.value) / 100;
    } else {
      cart.discount = Math.min(promo.value, subtotal); // Fixed discount, but not more than subtotal
    }
  } else {
    cart.discount = 0;
  }

  cart.total = subtotal - cart.discount;
};

export const cartService = {
  createOrFetchCart,
  addItem,
  updateItem,
  removeItem,
  applyPromoCode,
  removePromoCode,
  getCart,
  clearCart,
  calculateCartTotals
};
