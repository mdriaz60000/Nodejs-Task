import { CartModel } from '../cart/cart.model';
import { OrderModel } from '../order/order.model';
import { ProductModel } from '../Product/product.model';
import { PromoModel } from '../promo/promo.model';
import { CheckoutRequest, CheckoutResponse } from './checkout.interface';
import { TOrder } from '../order/order.interface';
import { v4 as uuidv4 } from 'uuid';

const validatePromoCode = async (code: string) => {
  const promo = await PromoModel.findOne({
    code: code.toUpperCase(),
    isActive: true,
    validFrom: { $lte: new Date() },
    validUntil: { $gte: new Date() },
  });

  if (!promo) {
    throw new Error('Invalid or expired promo code');
  }

  return promo;
};

const validateInventory = async (items: Array<{ productId: string; variantId: string; quantity: number }>) => {
  for (const item of items) {
    const product = await ProductModel.findById(item.productId);
    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }

    const variant = product.variants.find(v => v._id?.toString() === item.variantId);
    if (!variant) {
      throw new Error(`Product variant not found: ${item.variantId}`);
    }

    if (variant.inventory < item.quantity) {
      throw new Error(`Insufficient inventory for product: ${product.name} (${variant.sku})`);
    }
  }
};

const updateInventory = async (items: Array<{ productId: string; variantId: string; quantity: number }>) => {
  for (const item of items) {
    await ProductModel.updateOne(
      { _id: item.productId, 'variants._id': item.variantId },
      { $inc: { 'variants.$.inventory': -item.quantity } }
    );
  }
};

const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${timestamp}-${random}`;
};

const processCheckout = async (checkoutData: CheckoutRequest): Promise<CheckoutResponse> => {
  const cart = await CartModel.findOne({ guestToken: checkoutData.guestToken });
  if (!cart) throw new Error('Cart not found');
  if (cart.items.length === 0) throw new Error('Cart is empty');


  await validateInventory(cart.items);


  let promo = null;
  if (checkoutData.promoCode) {
    promo = await validatePromoCode(checkoutData.promoCode);
  }

  
  const orderNumber = generateOrderNumber();


  const orderData: Partial<TOrder> = {
    orderNumber,
    cartId: cart._id!.toString(),
    items: cart.items,
    subtotal: cart.subtotal,
    discount: cart.discount,
    total: cart.total,
    promoCode: cart.promoCode,
    status: 'pending',
  };

  const order = await OrderModel.create(orderData);


  await updateInventory(cart.items);


  await CartModel.findByIdAndUpdate(cart._id, {
    items: [],
    subtotal: 0,
    discount: 0,
    total: 0,
    promoCode: undefined,
  });

  
  return {
    orderId: order._id!.toString(),
    orderNumber: order.orderNumber,
    total: order.total,
    status: order.status,
    customerInfo: checkoutData.customerInfo,
    items: order.items,
    subtotal: order.subtotal,
    discount: order.discount,
    promoCode: order.promoCode,
    createdAt: order.createdAt!,
  };
};

const getCheckoutSummary = async (guestToken: string) => {
  const cart = await CartModel.findOne({ guestToken });
  if (!cart) throw new Error('Cart not found');
  if (cart.items.length === 0) throw new Error('Cart is empty');

  const itemsWithDetails = await Promise.all(
    cart.items.map(async item => {
      const product = await ProductModel.findById(item.productId);
      if (!product) throw new Error(`Product not found: ${item.productId}`);

      const variant = product.variants.find(v => v._id?.toString() === item.variantId);
      if (!variant) throw new Error(`Product variant not found: ${item.variantId}`);

      return {
        productId: item.productId,
        variantId: item.variantId,
        productName: product.name,
        variantSku: variant.sku,
        variantAttributes: variant.attributes,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
        availableInventory: variant.inventory,
      };
    })
  );

  return {
    items: itemsWithDetails,
    subtotal: cart.subtotal,
    discount: cart.discount,
    total: cart.total,
    promoCode: cart.promoCode,
    itemCount: cart.items.length,
  };
};

export const CheckoutService = {
  processCheckout,
  getCheckoutSummary,
  validatePromoCode,
  validateInventory,
  updateInventory,
  generateOrderNumber,
};
