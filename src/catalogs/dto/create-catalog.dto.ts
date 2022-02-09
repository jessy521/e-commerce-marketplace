import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCatalogDto {
  @ApiPropertyOptional({
    type: String,
    description: 'Seller Id ',
    default: '',
  })
  sellerId: string;

  @ApiPropertyOptional({
    type: [String],
    description: 'Product list ',
    default: [''],
  })
  productList: [string];
}
