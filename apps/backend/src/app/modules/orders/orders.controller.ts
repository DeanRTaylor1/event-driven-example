import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { ToCamel } from "@monorepo-example/common";
import { BodyToCamelCase } from "../../decorators/body-to-camel.decorator";
import {
  GetPagination,
  Pagination,
} from "../../decorators/pagination.decorator";

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { Order } from "./entities/order.entity";
import { Public } from "../../decorators/public-route.decorator";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({
    status: 201,
    type: Order,
    description: "Create an order",
  })
  @Public()
  create(
    @Body() _: CreateOrderDto,
    @BodyToCamelCase() createOrderDto: ToCamel<CreateOrderDto>
  ) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @Public()
  findAll(@GetPagination() pagination: Pagination) {
    return this.ordersService.findAll(pagination);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.ordersService.remove(+id);
  }
}
