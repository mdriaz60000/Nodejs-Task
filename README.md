# E-Commerce API

A comprehensive Node.js/TypeScript e-commerce API with product catalog, shopping cart, promotional codes, checkout, and order management.

## Features

- **Product Catalog**: Products with variants and pricing
- **Shopping Cart**: Guest cart management with token-based identification
- **Promotional Codes**: Percentage and fixed discounts with validity windows
- **Checkout Process**: Order creation from cart with inventory validation
- **Order Management**: Complete order lifecycle management
- **Input Validation**: Comprehensive request validation using Zod
- **Error Handling**: Standardized error responses
- **Request Logging**: Detailed request/response logging
- **Testing**: Unit tests with Jest

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Zod
- **Testing**: Jest
- **Development**: ts-node-dev

## Project Structure

```
src/
├── app/
│   ├── config/           # Configuration files
│   ├── errors/           # Error handling
│   ├── interface/        # TypeScript interfaces
│   ├── middlewares/      # Express middlewares
│   ├── modules/          # Feature modules
│   │   ├── cart/         # Shopping cart functionality
│   │   ├── checkout/     # Checkout process
│   │   ├── order/        # Order management
│   │   ├── Product/      # Product catalog
│   │   ├── promo/        # Promotional codes
│   │   └── user/         # User management
│   ├── routes/           # Route definitions
│   └── utils/            # Utility functions
├── test/                 # Test setup
├── app.ts               # Express app configuration
└── server.ts            # Server entry point
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd job-nodejs
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=5000
DATABASE_URL=mongodb://localhost:27017/ecommerce
NODE_ENV=development
BCRYPT_SALT_ROUNDS=12
```

4. Start the development server:
```bash
npm run start:dev
```

## API Endpoints

### Products

- `GET /api/v1/product` - Get all products
- `GET /api/v1/product/:id` - Get product by ID
- `POST /api/v1/product` - Create new product
- `PUT /api/v1/product/:id` - Update product
- `DELETE /api/v1/product/:id` - Delete product

### Cart

- `POST /api/v1/cart` - Create or fetch cart
- `GET /api/v1/cart/:guestToken` - Get cart by guest token
- `POST /api/v1/cart/:guestToken/items` - Add item to cart
- `PUT /api/v1/cart/:guestToken/items/:productId/:variantId` - Update item quantity
- `DELETE /api/v1/cart/:guestToken/items/:productId/:variantId` - Remove item from cart
- `POST /api/v1/cart/:guestToken/promo` - Apply promo code
- `DELETE /api/v1/cart/:guestToken/promo` - Remove promo code
- `DELETE /api/v1/cart/:guestToken` - Clear cart

### Promotional Codes

- `POST /api/v1/promo` - Create new promo code
- `GET /api/v1/promo` - Get all promo codes
- `GET /api/v1/promo/active` - Get active promo codes
- `GET /api/v1/promo/:id` - Get promo by ID
- `GET /api/v1/promo/code/:code` - Get promo by code
- `GET /api/v1/promo/validate/:code` - Validate promo code
- `PUT /api/v1/promo/:id` - Update promo code
- `DELETE /api/v1/promo/:id` - Delete promo code

### Checkout

- `POST /api/v1/checkout` - Process checkout
- `GET /api/v1/checkout/summary/:guestToken` - Get checkout summary

### Orders

- `GET /api/v1/order` - Get all orders
- `GET /api/v1/order/:id` - Get order by ID
- `PUT /api/v1/order/:id/status` - Update order status

### Users

- `POST /api/v1/user` - Create user
- `GET /api/v1/user` - Get all users
- `GET /api/v1/user/:id` - Get user by ID
- `PUT /api/v1/user/:id` - Update user
- `DELETE /api/v1/user/:id` - Delete user

## Data Models

### Product
```typescript
interface TProduct {
  _id?: string;
  name: string;
  description: string;
  category: string;
  variants: ProductVariant[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductVariant {
  _id?: string;
  sku: string;
  price: number;
  inventory: number;
  attributes: Record<string, string>;
}
```

### Cart
```typescript
interface TCart {
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

interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
}
```

### Promo Code
```typescript
interface TPromo {
  _id?: string;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
```

### Order
```typescript
interface TOrder {
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
```

## Usage Examples

### Creating a Cart and Adding Items

1. Create a new cart:
```bash
curl -X POST http://localhost:5000/api/v1/cart
```

2. Add item to cart:
```bash
curl -X POST http://localhost:5000/api/v1/cart/{guestToken}/items \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "product123",
    "variantId": "variant456",
    "quantity": 2
  }'
```

3. Apply promo code:
```bash
curl -X POST http://localhost:5000/api/v1/cart/{guestToken}/promo \
  -H "Content-Type: application/json" \
  -d '{
    "promoCode": "SAVE20"
  }'
```

4. Checkout:
```bash
curl -X POST http://localhost:5000/api/v1/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "guestToken": "{guestToken}",
    "customerInfo": {
      "name": "John Doe",
      "email": "john@example.com",
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001",
        "country": "USA"
      }
    }
  }'
```

### Creating Promo Codes

```bash
curl -X POST http://localhost:5000/api/v1/promo \
  -H "Content-Type: application/json" \
  -d '{
    "code": "SAVE20",
    "type": "percent",
    "value": 20,
    "validFrom": "2024-01-01T00:00:00.000Z",
    "validUntil": "2024-12-31T23:59:59.999Z",
    "isActive": true
  }'
```

## Validation

The API uses Zod for comprehensive input validation. All endpoints validate:

- Required fields
- Data types
- String lengths
- Email formats
- Date ranges
- Enum values

Example validation error response:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Email must be a valid email address",
    "Quantity must be a positive integer"
  ]
}
```

## Error Handling

The API provides standardized error responses:

```json
{
  "success": false,
  "message": "Error message",
  "errors": ["Detailed error information"]
}
```

Common error scenarios:
- 400: Validation errors
- 404: Resource not found
- 409: Conflict (e.g., insufficient inventory)
- 500: Internal server error

## Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm test -- --coverage
```

## Development

### Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

### Environment Variables

- `PORT` - Server port (default: 5000)
- `DATABASE_URL` - MongoDB connection string
- `NODE_ENV` - Environment (development/production/test)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run tests and ensure they pass
6. Submit a pull request

## License

This project is licensed under the ISC License.
