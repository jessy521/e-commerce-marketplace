import { ObjectId } from 'mongoose';

export class User {
  _id;
  username: String;
  password: String;
  isSeller: Boolean;
  role: String;
  orders: Array<ObjectId>;
}
