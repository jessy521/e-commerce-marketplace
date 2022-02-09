import * as mongoose from 'mongoose';
import { Product } from 'src/products/interface/product.interface';
const Schema = mongoose.Schema;

export const CatalogSchema = new mongoose.Schema({
  sellerId: {
    type: Schema.Types.ObjectId,
    // ref: User,
  },
  productList: [
    {
      type: Schema.Types.ObjectId,
      ref: Product,
    },
  ],
});
