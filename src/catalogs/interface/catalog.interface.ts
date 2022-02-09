import { ObjectId } from 'mongoose';

export class Catalog {
  sellerId: ObjectId;
  productList: Array<ObjectId>;
}
