import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ProductProviders } from './provider/product.provider';
import { AuthModule } from 'src/auth/auth.module';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [DatabaseModule, AuthModule, CaslModule],
  controllers: [ProductsController],
  providers: [ProductsService, ...ProductProviders],
})
export class ProductsModule {}
