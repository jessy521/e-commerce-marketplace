import * as mongoose from 'mongoose';
import { Catalog } from 'src/catalogs/interface/catalog.interface';
const Schema = mongoose.Schema;

export const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: 'number',
  catalogId: {
    type: Schema.Types.ObjectId,
    ref: Catalog,
  },
});
