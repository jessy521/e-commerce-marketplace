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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/interface/user.interface';
import { GetUser } from 'src/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Order } from './interface/order.interface';
import { Action } from 'src/casl/action.enum';
import { AppAbility } from 'src/casl/casl-ability.factor';
import { CheckPolicies } from 'src/casl/decorator/check-policies.decorator';
import { PoliciesGuard } from 'src/casl/policies.guard';

@ApiTags('api')
@Controller('api')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('buyer/create-order/:seller_id')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Order))
  @ApiOkResponse({ description: 'ordered  successfully' })
  @ApiForbiddenResponse({ description: 'failed to take order!' })
  create(
    @Param('seller_id') seller_id: string,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.create(createOrderDto, seller_id);
  }

  @Get('/seller/orders')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Get, Order))
  @ApiOkResponse({ description: 'fetched data successfully' })
  @ApiForbiddenResponse({ description: 'failed to fetch data!' })
  findAllForSeller(@GetUser() user: User) {
    return this.ordersService.findAllForSeller(user);
  }

  // @Get(':id')
  // @ApiOkResponse({ description: 'fetched data successfully' })
  // @ApiForbiddenResponse({ description: 'failed to fetch data!' })
  // findOne(@Param('id') id: string) {
  //   return this.ordersService.findOne(id);
  // }
}
