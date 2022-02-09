import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiPropertyOptional({
    type: String,
    description: 'name of thr product',
    default: '',
  })
  name: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Description of the product',
    default: '',
  })
  description: string;

  @ApiPropertyOptional({
    type: 'number',
    description: 'price of the product',
    default: 1000,
  })
  price: number;
}
