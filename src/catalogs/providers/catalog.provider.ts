import { Connection } from 'mongoose';
import { CatalogSchema } from '../schema/catalog.schema';

export const CatalogProviders = [
  {
    provide: 'CATALOG_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Catalog', CatalogSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
