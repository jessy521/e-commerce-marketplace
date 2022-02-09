import * as mongoose from 'mongoose';
import { User } from 'src/auth/interface/user.interface';
import { Product } from 'src/products/interface/product.interface';
const Schema = mongoose.Schema;

export const OrderSchema = new mongoose.Schema({
  productIdList: [
    {
      type: Schema.Types.ObjectId,
      ref: Product,
    },
  ],
  buyerId: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
  orderAmount: 'number',
  paid: Boolean,
  paymentMethod: String,
});
