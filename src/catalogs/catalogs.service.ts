import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from 'src/products/interface/product.interface';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { Catalog } from './interface/catalog.interface';
import * as mongoose from 'mongoose';

@Injectable()
export class CatalogsService {
  constructor(
    @Inject('CATALOG_MODEL')
    private readonly catalogModel: Model<Catalog>,
    @Inject('PRODUCT_MODEL')
    private productModel: Model<Product>,
  ) {}

  async create(createCatalogDto: CreateCatalogDto) {
    try {
      const catFound = await this.catalogModel.findOne({
        sellerId: createCatalogDto.sellerId,
      });
      if (catFound) {
        throw new Error('seller has created catalog already');
      } else {
        const newCatalog = new this.catalogModel(createCatalogDto);
        newCatalog.save();
        newCatalog.productList.forEach(async (productId) => {
          let product = await this.productModel.findById({ _id: productId });
          product.catalogId = newCatalog._id;
          await product.save();
        });
        return newCatalog;
      }
    } catch (err) {
      throw new ForbiddenException({ message: err.message });
    }
  }

  findAll() {
    try {
      return this.catalogModel.find({});
    } catch (err) {
      throw new ForbiddenException({ message: err.message });
    }
  }

  findOne(id: string) {
    try {
      return this.catalogModel.findById({ _id: id });
    } catch (err) {
      throw new ForbiddenException({ message: err.message });
    }
  }

  async findOneBySellerId(sellerId) {
    const ObjectId = mongoose.Types.ObjectId;
    const arr = await this.catalogModel.aggregate([
      { $match: { sellerId: new ObjectId(sellerId) } },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'catalogId',
          as: 'products',
        },
      },
    ]);
    return arr[0];
  }
}
