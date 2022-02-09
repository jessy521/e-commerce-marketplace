import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './interface/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private productModel: Model<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    try {
      const newItem = new this.productModel(createProductDto);
      newItem.save();
      return newItem;
    } catch (err) {
      throw new ForbiddenException({ message: err.message });
    }
  }

  findAll() {
    try {
      return this.productModel.find({});
    } catch (err) {
      throw new ForbiddenException({ message: err.message });
    }
  }

  findOne(id: string) {
    try {
      return this.productModel.findById({ _id: id });
    } catch (err) {
      throw new ForbiddenException({ message: err.message });
    }
  }
}
