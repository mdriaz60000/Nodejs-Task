import mongoose from 'mongoose';
import { cartService } from '../app/modules/cart/cart.service';
import { CartModel } from '../app/modules/cart/cart.model';
import { ProductModel } from '../app/modules/Product/product.model';

describe('Cart Service', () => {
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/ecommerce-test');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clear all collections before each test
    await CartModel.deleteMany({});
    await ProductModel.deleteMany({});
  });

  describe('createOrFetchCart', () => {
    it('should create a new cart when no guest token provided', async () => {
      const cart = await cartService.createOrFetchCart();
      
      expect(cart).toBeDefined();
      expect(cart.guestToken).toBeDefined();
      expect(cart.items).toEqual([]);
      expect(cart.subtotal).toBe(0);
      expect(cart.discount).toBe(0);
      expect(cart.total).toBe(0);
    });

    it('should fetch existing cart when guest token provided', async () => {
      const guestToken = 'test-token-123';
      const cart1 = await cartService.createOrFetchCart(guestToken);
      const cart2 = await cartService.createOrFetchCart(guestToken);
      
      expect(cart1._id).toEqual(cart2._id);
      expect(cart1.guestToken).toBe(guestToken);
    });
  });

  describe('getCart', () => {
    it('should return cart for valid guest token', async () => {
      const guestToken = 'test-token-456';
      await cartService.createOrFetchCart(guestToken);
      
      const cart = await cartService.getCart(guestToken);
      
      expect(cart).toBeDefined();
      expect(cart?.guestToken).toBe(guestToken);
    });

    it('should return null for non-existent guest token', async () => {
      const cart = await cartService.getCart('non-existent-token');
      
      expect(cart).toBeNull();
    });
  });
});
