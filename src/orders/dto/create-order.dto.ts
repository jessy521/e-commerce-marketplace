import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiPropertyOptional({
    type: [String],
    description: 'Enter product list here',
    default: [''],
  })
  productIdList: [string];

  @ApiPropertyOptional({
    type: 'number',
    description: 'total amount of booking',
    default: 1212,
  })
  orderAmount: number;

  @ApiPropertyOptional({
    type: String,
    description: 'Is the amount paid or not',
    default: false,
  })
  paid: boolean;

  @ApiPropertyOptional({
    type: String,
    description: 'method of payment',
    default: 'COD',
  })
  paymentMethod: string;
}
