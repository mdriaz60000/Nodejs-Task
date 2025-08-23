import { PromoModel } from './promo.model';
import { TPromo } from './promo.interface';

const createPromo = async (
  promoData: Omit<TPromo, '_id' | 'createdAt' | 'updatedAt'>
): Promise<TPromo> => {
  const promo = await PromoModel.create(promoData);
  return promo;
};

const getAllPromos = async (): Promise<TPromo[]> => {
  return await PromoModel.find().sort({ createdAt: -1 });
};

const getPromoById = async (id: string): Promise<TPromo | null> => {
  return await PromoModel.findById(id);
};

const getPromoByCode = async (code: string): Promise<TPromo | null> => {
  return await PromoModel.findOne({ code: code.toUpperCase() });
};

const updatePromo = async (
  id: string,
  updateData: Partial<TPromo>
): Promise<TPromo | null> => {
  return await PromoModel.findByIdAndUpdate(id, updateData, { new: true });
};

const deletePromo = async (id: string): Promise<TPromo | null> => {
  return await PromoModel.findByIdAndDelete(id);
};

const validatePromoCode = async (
  code: string
): Promise<{ isValid: boolean; promo?: TPromo; message?: string }> => {
  const promo = await PromoModel.findOne({
    code: code.toUpperCase(),
    isActive: true,
  });

  if (!promo) {
    return { isValid: false, message: 'Promo code not found' };
  }

  const now = new Date();
  if (now < promo.validFrom) {
    return { isValid: false, message: 'Promo code not yet valid' };
  }

  if (now > promo.validUntil) {
    return { isValid: false, message: 'Promo code has expired' };
  }

  return { isValid: true, promo };
};

const getActivePromos = async (): Promise<TPromo[]> => {
  const now = new Date();
  return await PromoModel.find({
    isActive: true,
    validFrom: { $lte: now },
    validUntil: { $gte: now },
  }).sort({ createdAt: -1 });
};

const calculateDiscount = (subtotal: number, promo: TPromo): number => {
  if (promo.type === 'percent') {
    return (subtotal * promo.value) / 100;
  } else {
    return Math.min(promo.value, subtotal); // Fixed discount, but not more than subtotal
  }
};

export const promoService = {
  createPromo,
  getAllPromos,
  getPromoById,
  getPromoByCode,
  updatePromo,
  deletePromo,
  validatePromoCode,
  getActivePromos,
  calculateDiscount,
};


