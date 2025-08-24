import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";


const createFromDb = async (payload: TOrder) => {
    const orderNumber = `ORD-${Date.now()}`;
    console.log(payload)

  
  const subtotal = payload.items.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

 
  const discount = payload.discount || 0;


  const total = subtotal - discount;

  const order = await OrderModel.create({
    ...payload,
    orderNumber,
    subtotal,
    total,
    discount
  });
  return  order
};

const getFromDb = async () => {
  return await OrderModel.find();
};
const getSingleFromDb = async (id : string) => {
  return await OrderModel.findOne({ _id: id });
};
const updateFromDb = async (id : string, payload :any) => {
  return await OrderModel.findOneAndUpdate({ _id: id }, payload, { new: true });
};

const deleteFromDb = async (id : string) => {
  return await OrderModel.findOneAndDelete({ _id: id });
};

export const orderService = {
    createFromDb,
    getFromDb,
    getSingleFromDb,
    updateFromDb,
    deleteFromDb
}
