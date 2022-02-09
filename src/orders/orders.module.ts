import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderProviders } from './providers/order.provider';
import { DatabaseModule } from 'src/database/database.module';
import { CatalogProviders } from 'src/catalogs/providers/catalog.provider';
import { ProductProviders } from 'src/products/provider/product.provider';
import { authProviders } from 'src/auth/provider/auth.provider';
import { CaslModule } from 'src/casl/casl.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, CaslModule, AuthModule],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    ...OrderProviders,
    ...CatalogProviders,
    ...ProductProviders,
    ...authProviders,
  ],
})
export class OrdersModule {}
