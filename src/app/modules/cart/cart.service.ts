


// import { v4 as uuidv4 } from 'uuid';
// import { CartModel } from './cart.model';
// import { TCart } from './cart.interface';
// import { ProductModel } from '../Product/product.model';
// import { PromoModel } from '../promo/promo.model';

// export class CartService {
//   static async createCart(): Promise<TCart> {
//     const guestToken = uuidv4();
//     const cart = new CartModel({
//       guestToken,
//       items: [],
//       subtotal: 0,
//       discount: 0,
//       total: 0
//     });

//     return cart.save();
//   }

//   static async getCartByToken(guestToken: string): Promise<TCart | null> {
//     return CartModel.findOne({ guestToken });
//   }

//   static async addItemToCart(
//     guestToken: string,
//     productId: string,
//     variantId: string,
//     quantity: number
//   ): Promise<TCart> {
//     // Verify product and variant exist
//     const product = await ProductModel.findById(productId);
//     if (!product) {
//       throw new Error('Product not found');
//     }

//     const variant = product.variants.id(variantId);
//     if (!variant) {
//       throw new Error('Product variant not found');
//     }

//     if (variant.inventory < quantity) {
//       throw new Error('Insufficient inventory');
//     }

//     let cart = await this.getCartByToken(guestToken);
//     if (!cart) {
//       cart = await this.createCart();
//       cart.guestToken = guestToken;
//     }

//     // Check if item already exists in cart
//     const existingItemIndex = cart.items.findIndex(
//       item => item.productId === productId && item.variantId === variantId
//     );

//     if (existingItemIndex > -1) {
//       cart.items[existingItemIndex].quantity += quantity;
//       if (cart.items[existingItemIndex].quantity > variant.inventory) {
//         throw new Error('Insufficient inventory');
//       }
//     } else {
//       cart.items.push({
//         productId,
//         variantId,
//         quantity,
//         price: variant.price
//       });
//     }

//     await this.recalculateCart(cart);
//     return cart.save();
//   }

//   static async updateCartItem(
//     guestToken: string,
//     productId: string,
//     variantId: string,
//     quantity: number
//   ): Promise<TCart> {
//     const cart = await this.getCartByToken(guestToken);
//     if (!cart) {
//       throw new Error('Cart not found');
//     }

//     const itemIndex = cart.items.findIndex(
//       item => item.productId === productId && item.variantId === variantId
//     );

//     if (itemIndex === -1) {
//       throw new Error('Item not found in cart');
//     }

//     // Verify inventory
//     const product = await ProductModel.findById(productId);
//     if (!product) {
//       throw new Error('Product not found');
//     }

//     const variant = product.variants.id(variantId);
//     if (!variant || variant.inventory < quantity) {
//       throw new Error('Insufficient inventory');
//     }

//     cart.items[itemIndex].quantity = quantity;
//     await this.recalculateCart(cart);
//     return cart.save();
//   }

//   static async removeItemFromCart(
//     guestToken: string,
//     productId: string,
//     variantId: string
//   ): Promise<TCart> {
//     const cart = await this.getCartByToken(guestToken);
//     if (!cart) {
//       throw new Error('Cart not found');
//     }

//     cart.items = cart.items.filter(
//       item => !(item.productId === productId && item.variantId === variantId)
//     );

//     await this.recalculateCart(cart);
//     return cart.save();
//   }

//   static async applyPromo(guestToken: string, promoCode: string): Promise<TCart> {
//     const cart = await this.getCartByToken(guestToken);
//     if (!cart) {
//       throw new Error('Cart not found');
//     }

//     const promo = await PromoModel.findOne({
//       code: promoCode.toUpperCase(),
//       isActive: true,
//       validFrom: { $lte: new Date() },
//       validUntil: { $gte: new Date() }
//     });

//     if (!promo) {
//       throw new Error('Invalid or expired promo code');
//     }

//     cart.promoCode = promo.code;
//     await this.recalculateCart(cart);
//     return cart.save();
//   }

//   static async removePromo(guestToken: string): Promise<TCart> {
//     const cart = await this.getCartByToken(guestToken);
//     if (!cart) {
//       throw new Error('Cart not found');
//     }

//     cart.promoCode = undefined;
//     await this.recalculateCart(cart);
//     return cart.save();
//   }

//   private static async recalculateCart(cart: TCart): Promise<void> {
//     cart.subtotal = cart.items.reduce(
//       (sum, item) => sum + (item.price * item.quantity),
//       0
//     );

//     cart.discount = 0;
//     if (cart.promoCode) {
//       const promo = await PromoModel.findOne({
//         code: cart.promoCode,
//         isActive: true,
//         validFrom: { $lte: new Date() },
//         validUntil: { $gte: new Date() }
//       });

//       if (promo) {
//         if (promo.type === 'percent') {
//           cart.discount = Math.round(cart.subtotal * (promo.value / 100));
//         } else {
//           cart.discount = Math.min(promo.value, cart.subtotal);
//         }
//       }
//     }

//     cart.total = Math.max(0, cart.subtotal - cart.discount);
//   }
// }
