export interface TPromo {
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