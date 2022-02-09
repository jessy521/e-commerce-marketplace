import { ObjectId } from 'mongoose';

export class Order {
  _id;
  productIdList: Array<ObjectId>;
  buyerId;
  orderAmount: 'number';
  paid: boolean;
  paymentMethod: string;
}
