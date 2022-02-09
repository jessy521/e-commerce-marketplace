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
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Action } from 'src/casl/action.enum';
import { AppAbility } from 'src/casl/casl-ability.factor';
import { CheckPolicies } from 'src/casl/decorator/check-policies.decorator';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { CatalogsService } from './catalogs.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { Catalog } from './interface/catalog.interface';

@ApiTags('api')
@Controller('api')
export class CatalogsController {
  constructor(private readonly catalogsService: CatalogsService) {}

  @Post('seller/create-catalog')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Catalog))
  @ApiOkResponse({ description: 'catalog created successfully' })
  @ApiForbiddenResponse({ description: 'failed to create!' })
  create(@Body() createCatalogDto: CreateCatalogDto) {
    return this.catalogsService.create(createCatalogDto);
  }

  // @Get()
  // @ApiOkResponse({ description: 'fetched data successfully' })
  // @ApiForbiddenResponse({ description: 'failed to fetch data!' })
  // findAll() {
  //   return this.catalogsService.findAll();
  // }

  @Get('buyer/seller-catalog/:seller_id')
  @ApiOkResponse({ description: 'fetched data successfully' })
  @ApiForbiddenResponse({ description: 'failed to fetch data!' })
  findOne(@Param('seller_id') seller_id: string) {
    return this.catalogsService.findOneBySellerId(seller_id);
  }
}
