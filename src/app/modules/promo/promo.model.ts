import mongoose, { Schema, Document } from 'mongoose';
import { TPromo } from './promo.interface';

const PromoSchema = new Schema<TPromo & Document>({
  code: { type: String, required: true, unique: true, uppercase: true },
  type: { type: String, enum: ['percent', 'fixed'], required: true },
  value: { type: Number, required: true, min: 0 },
  validFrom: { type: Date, required: true },
  validUntil: { type: Date, required: true },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

PromoSchema.index({ code: 1 });
PromoSchema.index({ validFrom: 1, validUntil: 1 });

export const PromoModel = mongoose.model<TPromo & Document>('Promo', PromoSchema);