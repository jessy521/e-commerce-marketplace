import { Module } from '@nestjs/common';
import { CatalogsService } from './catalogs.service';
import { CatalogsController } from './catalogs.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CatalogProviders } from './providers/catalog.provider';
import { ProductProviders } from 'src/products/provider/product.provider';
import { AuthModule } from 'src/auth/auth.module';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [DatabaseModule, AuthModule, CaslModule],
  controllers: [CatalogsController],
  providers: [CatalogsService, ...CatalogProviders, ...ProductProviders],
})
export class CatalogsModule {}
