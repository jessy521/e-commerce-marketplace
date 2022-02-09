import { ObjectId } from 'mongoose';

export class Product {
  _id;
  name: string;
  description: string;
  price: number;
  catalogId;
}
