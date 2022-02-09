import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Product } from './interface/product.interface';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { CheckPolicies } from 'src/casl/decorator/check-policies.decorator';
import { AppAbility } from 'src/casl/casl-ability.factor';
import { Action } from 'src/casl/action.enum';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Product))
  @ApiOkResponse({ description: 'product added successfully' })
  @ApiForbiddenResponse({ description: 'failed to add product!' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOkResponse({ description: 'fetched data successfully' })
  @ApiForbiddenResponse({ description: 'failed to fetch data!' })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'fetched data successfully' })
  @ApiForbiddenResponse({ description: 'failed to fetch data!' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
}
