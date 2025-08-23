import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const createFromDb = async (payload: TProduct) => {
  return await ProductModel.create(payload);
};
const getFromDb = async () => {
  return await ProductModel.find();
};
const getSingleFromDb = async (id : string) => {
  return await ProductModel.findOne({ _id: id });
};


export const productService = {
    createFromDb,
    getFromDb,
    getSingleFromDb
}
