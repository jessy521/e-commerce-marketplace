import { Connection } from 'mongoose';
import { OrderSchema } from '../schema/order.schema';

export const OrderProviders = [
  {
    provide: 'ORDER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Order', OrderSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
