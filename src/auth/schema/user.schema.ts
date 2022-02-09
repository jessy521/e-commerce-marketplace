import * as mongoose from 'mongoose';
import { Order } from 'src/orders/interface/order.interface';
const Schema = mongoose.Schema;

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isSeller: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: 'buyer',
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: Order,
    },
  ],
});
