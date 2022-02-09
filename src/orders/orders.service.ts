import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/auth/interface/user.interface';
import { Catalog } from 'src/catalogs/interface/catalog.interface';
import { Product } from 'src/products/interface/product.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './interface/order.interface';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_MODEL')
    private readonly ordersModel: Model<Order>,
    @Inject('CATALOG_MODEL')
    private readonly catalogModel: Model<Catalog>,
    @Inject('USER_MODEL')
    private authModel: Model<User>,
    @Inject('PRODUCT_MODEL')
    private productModel: Model<Product>,
  ) {}

  create(createOrderDto: CreateOrderDto, seller_id: string) {
    try {
      const newOrder = new this.ordersModel(createOrderDto);

      newOrder.buyerId = seller_id;
      newOrder.productIdList.forEach(async (productId) => {
        const product = await this.productModel.findOne({ _id: productId });
        const catalog = await this.catalogModel.findOne({
          _id: product.catalogId,
        });
        let seller = await this.authModel.findOne({ _id: catalog.sellerId });
        seller.orders.push(newOrder._id);
        seller.save();
      });
      newOrder.save();
      return newOrder;
    } catch (error) {
      throw new ForbiddenException({ message: error.message });
    }
  }

  findAll() {
    try {
      return this.ordersModel.find({});
    } catch (error) {
      throw new ForbiddenException({ message: error.message });
    }
  }

  findOne(id: string) {
    try {
      return this.ordersModel.findById({ _id: id });
    } catch (error) {
      throw new ForbiddenException({ message: error.message });
    }
  }

  async findAllForSeller(user: User) {
    const orderList = await (
      await this.authModel.findById({ _id: user._id })
    ).orders;
    let finalList = [];
    for (let i = 0; i < orderList.length; i++) {
      const order = await this.ordersModel.findById({ _id: orderList[i] });
      finalList.push(order);
    }

    const unique = [
      ...new Map(finalList.map((item, key) => [item[key], item])).values(),
    ];
    return unique;
  }
}
