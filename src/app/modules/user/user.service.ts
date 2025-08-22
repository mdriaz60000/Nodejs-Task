import { User } from './user.model';
import { TUser } from './user.interface';

const createUserDb = async (userData: TUser) => {
  const result = await User.create(userData); 
  return result;
};
const getAllUserDb = async () => {
  const result = await User.find().select('-password'); 
  return result;
};

const getUserIdDb = async (id: string) => {
  const result = await User.findOne({id}); 
  return result;

}
const updateUserDb = async (userId : string, updateData:TUser) => {
  const result = await User.findByIdAndUpdate(userId, updateData,  { new: true }).select('-password'); 
  return result;
};
const deleteUserDb = async (userId : string) => {
  const result = await User.findByIdAndUpdate({userId},  { isDeleted: true }); 
  return result;
};

export const UserService = {
  createUserDb,
  getAllUserDb,
  getUserIdDb,
  updateUserDb,
  deleteUserDb

}
