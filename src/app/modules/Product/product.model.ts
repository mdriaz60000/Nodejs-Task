import mongoose, { Schema, Document } from 'mongoose';
import { TProduct, ProductVariant } from './product.interface';


const ProductVariantSchema = new Schema<ProductVariant>({
  sku: { type: String, required: true, unique: true },
  price: { type: Number, required: true, min: 0 },
  inventory: { type: Number, required: true, min: 0 },
  attributes: { type: Map, of: String, default: {} }
});

const ProductSchema = new Schema<TProduct & Document>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  variants: [ProductVariantSchema]
}, {
  timestamps: true
});

ProductSchema.index({ name: 'text', description: 'text', category: 'text' });

export const ProductModel = mongoose.model<TProduct & Document>('Product', ProductSchema);
